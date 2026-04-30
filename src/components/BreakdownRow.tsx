import clsx from 'clsx'

interface BreakdownRowProps {
  label: string
  formula: string
  value: string
  highlight?: boolean
}

export default function BreakdownRow({
  label,
  formula,
  value,
  highlight = false,
}: BreakdownRowProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-between rounded-xl px-3.5 py-3 mb-1.5',
        'border transition-colors',
        highlight
          ? 'bg-amber-500/8 border-amber-500/20'
          : 'bg-white/2 border-transparent'
      )}
    >
      <div>
        <p
          className={clsx(
            'text-[13px] font-medium',
            highlight ? 'text-amber-300' : 'text-gray-200'
          )}
        >
          {label}
        </p>
        <p className="mt-0.5 text-[11px] text-gray-500">{formula}</p>
      </div>
      <p
        className={clsx(
          'text-sm font-bold font-syne',
          highlight ? 'text-accent' : 'text-gray-100'
        )}
      >
        {value}
      </p>
    </div>
  )
}