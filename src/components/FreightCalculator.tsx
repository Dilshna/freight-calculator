'use client'

import { useState, useCallback } from 'react'
import type { ShipmentForm, FreightResult, FormErrors } from '@/types/freight'
import { calculateFreight, validateForm } from '@/lib/calculate'
import InputField from './InputField'
import Toggle from './Toggle'
import ResultCard from './ResultCard'

const INITIAL_FORM: ShipmentForm = {
  grossWeight: '',
  volume: '',
  localDocs: false,
}

export default function FreightCalculator() {
  const [form, setForm] = useState<ShipmentForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [result, setResult] = useState<FreightResult | null>(null)

  const handleCalculate = useCallback(() => {
    const validationErrors = validateForm(form.grossWeight, form.volume)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setResult(
      calculateFreight(
        parseFloat(form.grossWeight),
        parseFloat(form.volume),
        form.localDocs
      )
    )
  }, [form])

  const handleReset = useCallback(() => {
    setForm(INITIAL_FORM)
    setErrors({})
    setResult(null)
  }, [])

  const clearError = useCallback((field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }, [])

  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/7 bg-navy/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent"
              aria-hidden="true"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
                <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                <path d="M16.5 9.4 7.55 4.24" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" y1="22" x2="12" y2="12" />
                <circle cx="18.5" cy="15.5" r="2.5" />
                <path d="M20.27 17.27 22 19" />
              </svg>
            </div>
            <span className="font-syne text-lg font-extrabold tracking-tight">
              CargoCalc
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500" aria-label="Service status: live">
            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]" />
            Live Rates
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        {/* Hero */}
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-accent">
            Ocean Freight Calculator
          </div>
          <h1 className="font-syne mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Instant Freight Estimates
          </h1>
          <p className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400">
            <span>Real-time calculation</span>
            <span className="h-1 w-1 rounded-full bg-gray-600" />
            <span className="font-semibold text-accent">Guangzhou → Jebel Ali</span>
            <span className="h-1 w-1 rounded-full bg-gray-600" />
            <span>LCL / FCL</span>
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
          {/* Input panel */}
          <section
            aria-labelledby="shipment-heading"
            className="rounded-2xl border border-white/7 bg-navy-mid p-6 sm:p-8"
          >
            <h2
              id="shipment-heading"
              className="font-syne mb-7 flex items-center gap-2.5 text-lg font-bold"
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-sm text-accent"
                aria-hidden="true"
              >
                1
              </span>
              Shipment Details
            </h2>

            <div className="flex flex-col gap-5">
              <InputField
                id="grossWeight"
                label="Gross Weight (kg)"
                placeholder="e.g. 2000"
                value={form.grossWeight}
                unit="KG"
                error={errors.grossWeight}
                onChange={(v) => {
                  setForm((f) => ({ ...f, grossWeight: v }))
                  clearError('grossWeight')
                }}
              />

              <InputField
                id="volume"
                label="Volume (CBM)"
                placeholder="e.g. 3.5"
                value={form.volume}
                unit="CBM"
                error={errors.volume}
                onChange={(v) => {
                  setForm((f) => ({ ...f, volume: v }))
                  clearError('volume')
                }}
              />

              <Toggle
                id="localDocs"
                checked={form.localDocs}
                onChange={(v) => setForm((f) => ({ ...f, localDocs: v }))}
                label="Local Documentation"
                description="+$150 flat fee if required"
              />

              <button
                onClick={handleCalculate}
                className="w-full rounded-xl bg-accent px-6 py-4 font-syne text-[15px] font-bold text-black transition-opacity hover:opacity-90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                Calculate Freight Cost →
              </button>

              {result && (
                <button
                  onClick={handleReset}
                  className="w-full rounded-xl border border-white/10 px-6 py-3 text-sm text-gray-500 transition-colors hover:text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/20 focus-visible:outline-offset-2"
                >
                  Reset Calculator
                </button>
              )}
            </div>
          </section>

          {/* Result panel */}
          <section aria-label="Calculation results" aria-live="polite">
            {result ? (
              <ResultCard result={result} grossWeight={form.grossWeight} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-navy-mid px-8 py-16 text-center">
                <div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-amber-500/8"
                  aria-hidden="true"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8m-4-4v4" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">
                  Enter shipment details and click Calculate to see your freight cost breakdown
                </p>
              </div>
            )}

            {/* Info note */}
            <div
              role="note"
              className="mt-4 flex gap-3 rounded-xl border border-blue-500/15 bg-blue-500/6 p-4"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" aria-hidden="true" className="mt-0.5 shrink-0">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4m0-4h.01" />
              </svg>
              <p className="text-xs leading-relaxed text-blue-300">
                Chargeable CBM uses the higher of weight-converted CBM (weight ÷ 500) vs actual
                volume. Rate: <strong>$265/CBM</strong>. Estimates only — contact us for final quotes.
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/7 py-5 text-center">
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} CargoCalc · Estimates only · Not a binding quote
        </p>
      </footer>
    </div>
  )
}