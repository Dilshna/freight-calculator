'use client'

import { useState, useCallback } from 'react'

interface FormData {
  grossWeight: string
  volume: string
  localDocs: boolean
}

interface CalcResult {
  weightCBM: number
  actualCBM: number
  chargeableCBM: number
  freightCost: number
  docsCost: number
  totalCost: number
}

interface FormErrors {
  grossWeight?: string
  volume?: string
}

export default function FreightCalculator() {
  const [form, setForm] = useState<FormData>({ grossWeight: '', volume: '', localDocs: false })
  const [errors, setErrors] = useState<FormErrors>({})
  const [result, setResult] = useState<CalcResult | null>(null)
  const [calculated, setCalculated] = useState(false)

  const validate = (): boolean => {
    const errs: FormErrors = {}
    const w = parseFloat(form.grossWeight)
    const v = parseFloat(form.volume)
    if (!form.grossWeight || isNaN(w) || w <= 0) errs.grossWeight = 'Enter a valid weight greater than 0'
    if (!form.volume || isNaN(v) || v <= 0) errs.volume = 'Enter a valid volume greater than 0'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const calculate = useCallback(() => {
    if (!validate()) return
    const w = parseFloat(form.grossWeight)
    const v = parseFloat(form.volume)
    const weightCBM = w / 500
    const chargeableCBM = Math.max(weightCBM, v)
    const freightCost = chargeableCBM * 265
    const docsCost = form.localDocs ? 150 : 0
    setResult({ weightCBM, actualCBM: v, chargeableCBM, freightCost, docsCost, totalCost: freightCost + docsCost })
    setCalculated(true)
  }, [form])

  const reset = () => {
    setForm({ grossWeight: '', volume: '', localDocs: false })
    setErrors({})
    setResult(null)
    setCalculated(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)', padding: '0' }}>
      <header style={{ borderBottom: '1px solid var(--border)', background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
                <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/>
                <path d="M16.5 9.4 7.55 4.24"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/>
                <circle cx="18.5" cy="15.5" r="2.5"/><path d="M20.27 17.27 22 19"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>CargoCalc</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
            Live Rates
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--accent-glow)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 100, padding: '6px 16px', fontSize: 12, color: 'var(--accent)', marginBottom: 20, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
            Ocean Freight Calculator
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 52px)', lineHeight: 1.1, marginBottom: 16, letterSpacing: '-1px' }}>
            Instant Freight Estimates
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 15, color: '#9ca3af', flexWrap: 'wrap' as const }}>
            <span>Real-time calculation</span>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Guangzhou → Jebel Ali</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 24, alignItems: 'start' }}>
          {/* Input Card */}
          <div style={{ background: 'var(--navy-mid)', border: '1px solid var(--border)', borderRadius: 20, padding: 32 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 28 }}>Shipment Details</h2>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#d1d5db', marginBottom: 8 }}>Gross Weight (kg)</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number" min="0" placeholder="e.g. 2000"
                  value={form.grossWeight}
                  onChange={e => { setForm(f => ({ ...f, grossWeight: e.target.value })); if (errors.grossWeight) setErrors(er => ({ ...er, grossWeight: undefined })) }}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${errors.grossWeight ? '#ef4444' : 'var(--border)'}`, borderRadius: 12, padding: '13px 48px 13px 16px', fontSize: 15, color: '#f3f4f6', outline: 'none', fontFamily: 'inherit' }}
                />
                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>KG</span>
              </div>
              {errors.grossWeight && <p style={{ fontSize: 12, color: '#ef4444', marginTop: 6 }}>{errors.grossWeight}</p>}
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#d1d5db', marginBottom: 8 }}>Volume (CBM)</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number" min="0" step="0.01" placeholder="e.g. 3.5"
                  value={form.volume}
                  onChange={e => { setForm(f => ({ ...f, volume: e.target.value })); if (errors.volume) setErrors(er => ({ ...er, volume: undefined })) }}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${errors.volume ? '#ef4444' : 'var(--border)'}`, borderRadius: 12, padding: '13px 56px 13px 16px', fontSize: 15, color: '#f3f4f6', outline: 'none', fontFamily: 'inherit' }}
                />
                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>CBM</span>
              </div>
              {errors.volume && <p style={{ fontSize: 12, color: '#ef4444', marginTop: 6 }}>{errors.volume}</p>}
            </div>

            <div style={{ marginBottom: 28, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#e5e7eb', marginBottom: 3 }}>Local Documentation</p>
                <p style={{ fontSize: 12, color: 'var(--muted)' }}>+$150 flat fee if required</p>
              </div>
              <button onClick={() => setForm(f => ({ ...f, localDocs: !f.localDocs }))}
                style={{ width: 52, height: 28, borderRadius: 100, border: 'none', cursor: 'pointer', background: form.localDocs ? 'var(--accent)' : 'rgba(255,255,255,0.1)', position: 'relative', transition: 'background 0.25s', flexShrink: 0 }}>
                <span style={{ position: 'absolute', width: 22, height: 22, background: '#fff', borderRadius: '50%', top: 3, left: form.localDocs ? 27 : 3, transition: 'left 0.25s' }} />
              </button>
            </div>

            <button onClick={calculate}
              style={{ width: '100%', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 12, padding: '15px 24px', fontSize: 15, fontWeight: 700, fontFamily: 'Syne, sans-serif', cursor: 'pointer' }}>
              Calculate Freight Cost →
            </button>

            {calculated && (
              <button onClick={reset}
                style={{ width: '100%', background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 12, padding: '11px 24px', fontSize: 13, cursor: 'pointer', marginTop: 10, fontFamily: 'inherit' }}>
                Reset Calculator
              </button>
            )}
          </div>

          {/* Result Card */}
          <div>
            {!result ? (
              <div style={{ background: 'var(--navy-mid)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 20, padding: 48, textAlign: 'center' }}>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>Enter shipment details and click Calculate to see your freight cost breakdown</p>
              </div>
            ) : (
              <div style={{ background: 'var(--navy-mid)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))', borderBottom: '1px solid var(--border)', padding: '24px 28px' }}>
                  <p style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Total Freight Cost</p>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 8 }}>
                    ${result.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#9ca3af' }}>
                    <span>🇨🇳 Guangzhou</span>
                    <span style={{ color: 'var(--accent)' }}>→</span>
                    <span>🇦🇪 Jebel Ali</span>
                  </div>
                </div>

                <div style={{ padding: '24px 28px' }}>
                  <p style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 16 }}>Calculation Breakdown</p>

                  {[
                    { label: 'Weight → CBM', formula: `${form.grossWeight} kg ÷ 500`, value: `${result.weightCBM.toFixed(4)} CBM` },
                    { label: 'Actual Volume', formula: 'As entered', value: `${result.actualCBM.toFixed(4)} CBM` },
                    { label: 'Chargeable CBM', formula: `MAX(${result.weightCBM.toFixed(4)}, ${result.actualCBM.toFixed(4)})`, value: `${result.chargeableCBM.toFixed(4)} CBM`, highlight: true },
                    { label: 'Freight Cost', formula: `${result.chargeableCBM.toFixed(4)} × $265`, value: `$${result.freightCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}` },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 14px', borderRadius: 10, marginBottom: 6, background: row.highlight ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${row.highlight ? 'rgba(245,158,11,0.2)' : 'transparent'}` }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: row.highlight ? '#fbbf24' : '#e5e7eb' }}>{row.label}</p>
                        <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{row.formula}</p>
                      </div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: row.highlight ? 'var(--accent)' : '#f3f4f6', fontFamily: 'Syne, sans-serif' }}>{row.value}</p>
                    </div>
                  ))}

                  {result.docsCost > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 14px', borderRadius: 10, marginBottom: 6, background: 'rgba(255,255,255,0.02)' }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: '#e5e7eb' }}>Local Documentation</p>
                        <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Flat fee</p>
                      </div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#f3f4f6', fontFamily: 'Syne, sans-serif' }}>$150.00</p>
                    </div>
                  )}

                  <div style={{ borderTop: '1px solid var(--border)', marginTop: 12, paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Total</p>
                    <p style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent)', fontFamily: 'Syne, sans-serif' }}>
                      ${result.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: 16, background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 14, padding: '14px 18px' }}>
              <p style={{ fontSize: 12, color: '#93c5fd', lineHeight: 1.6 }}>
                Chargeable CBM = higher of weight÷500 vs actual volume. Rate: <strong>$265/CBM</strong>. Estimates only.
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 720px) {
            div[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; }
          }
          input[type=number]::-webkit-inner-spin-button,
          input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
          input[type=number] { -moz-appearance: textfield; }
        `}</style>
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: 'var(--muted)' }}>© 2024 CargoCalc · Estimates only · Not a binding quote</p>
      </footer>
    </div>
  )
}