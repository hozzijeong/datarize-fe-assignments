import { forwardRef } from 'react'

interface SearchInputProps {
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, placeholder = '검색...', onChange }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    }

    return (
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full max-w-xs rounded-md border border-gray-300 px-4 py-2 focus:border-brand-green-800 focus:outline-none"
      />
    )
  },
)

SearchInput.displayName = 'SearchInput'
