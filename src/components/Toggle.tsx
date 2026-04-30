'use client'

interface ToggleProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description: string
}

export default function Toggle({
  id,
  checked,
  onChange,
  label,
  description,
}: ToggleProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/7 bg-white/3 px-4 py-4">
      <div>
        <p className="text-sm font-medium text-gray-200">{label}</p>
        <p className="mt-0.5 text-xs text-gray-500">{description}</p>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={clsx(
          'relative h-7 w-[52px] flex-shrink-0 rounded-full border-none',
          'cursor-pointer transition-colors duration-250 focus-visible:outline',
          'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
          checked ? 'bg-accent' : 'bg-white/10'
        )}
      >
        <span
          className={clsx(
            'absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white',
            'shadow-[0_1px_4px_rgba(0,0,0,0.4)] transition-[left] duration-250',
            checked ? 'left-[27px]' : 'left-[3px]'
          )}
        />
      </button>
    </div>
  )
}

function clsx(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}