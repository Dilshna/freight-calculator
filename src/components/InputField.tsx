import { forwardRef } from 'react'
import clsx from 'clsx'

interface InputFieldProps {
  id: string
  label: string
  placeholder: string
  value: string
  unit: string
  error?: string
  onChange: (value: string) => void
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, label, placeholder, value, unit, error, onChange }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-300"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type="number"
            min="0"
            step="any"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={!!error}
            className={clsx(
              'w-full bg-white/5 rounded-xl px-4 py-3 pr-14 text-[15px] text-gray-100',
              'border outline-none transition-colors duration-200',
              'placeholder:text-gray-600 focus:border-accent',
              error
                ? 'border-red-500 focus:border-red-400'
                : 'border-white/10 hover:border-white/20'
            )}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 pointer-events-none">
            {unit}
          </span>
        </div>
        {error && (
          <p
            id={`${id}-error`}
            role="alert"
            className="flex items-center gap-1.5 text-xs text-red-400"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </p>
        )}
      </div>
    )
  }
)

InputField.displayName = 'InputField'

export default InputField