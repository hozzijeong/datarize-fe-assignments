import { forwardRef } from 'react'

interface SearchInputProps {
  value: string
  placeholder?: string
  onChange: (value: string) => void
  onSearch: () => void
}

/**
 * 검색 입력 컴포넌트
 *
 * - 검색 버튼을 통해 명시적으로 검색을 실행
 * - Enter 키로도 검색 가능
 * - 실시간 필터링이 아닌 명시적 검색 방식으로,
 *   사용자가 검색 의도를 명확히 표현할 수 있음
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, placeholder = '검색...', onChange, onSearch }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch()
      }
    }

    return (
      <div className="flex gap-2">
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full max-w-xs rounded-md border border-gray-300 px-4 py-2 focus:border-brand-green-800 focus:outline-none"
        />
        <button
          type="button"
          onClick={onSearch}
          className="rounded-md shrink-0 bg-brand-green-1000 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-green-1100"
        >
          검색
        </button>
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'
