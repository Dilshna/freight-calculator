import type { FreightResult } from '@/types/freight'
import BreakdownRow from './BreakdownRow'

interface ResultCardProps {
  result: FreightResult
  grossWeight: string
}

export default function ResultCard({ result, grossWeight }: ResultCardProps) {
  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="rounded-2xl border border-white/7 bg-navy-mid overflow-hidden">
      {/* Total header */}
      <div className="bg-gradient-to-br from-amber-500/15 to-amber-500/5 border-b border-white/7 px-7 py-6">
        <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-2">
          Total Freight Cost
        </p>
        <p className="font-syne text-4xl md:text-5xl font-extrabold text-white leading-none mb-3">
          ${fmt(result.totalCost)}
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>🇨🇳 Guangzhou</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M5 12h14m-7-7 7 7-7 7" />
          </svg>
          <span>🇦🇪 Jebel Ali</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="px-7 py-6">
        <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-4">
          Calculation Breakdown
        </p>

        <BreakdownRow
          label="Weight → CBM"
          formula={`${grossWeight} kg ÷ 500`}
          value={`${result.weightCBM.toFixed(4)} CBM`}
        />
        <BreakdownRow
          label="Actual Volume"
          formula="As entered"
          value={`${result.actualCBM.toFixed(4)} CBM`}
        />
        <BreakdownRow
          label="Chargeable CBM"
          formula={`MAX(${result.weightCBM.toFixed(4)}, ${result.actualCBM.toFixed(4)})`}
          value={`${result.chargeableCBM.toFixed(4)} CBM`}
          highlight
        />
        <BreakdownRow
          label="Freight Cost"
          formula={`${result.chargeableCBM.toFixed(4)} CBM × $265`}
          value={`$${fmt(result.freightCost)}`}
        />

        {result.docsCost > 0 && (
          <BreakdownRow
            label="Local Documentation"
            formula="Flat fee"
            value="$150.00"
          />
        )}

        {/* Total line */}
        <div className="flex items-center justify-between border-t border-white/7 mt-3 pt-4 px-1">
          <p className="text-[15px] font-semibold text-white">Total</p>
          <p className="font-syne text-xl font-extrabold text-accent">
            ${fmt(result.totalCost)}
          </p>
        </div>
      </div>
    </div>
  )
}