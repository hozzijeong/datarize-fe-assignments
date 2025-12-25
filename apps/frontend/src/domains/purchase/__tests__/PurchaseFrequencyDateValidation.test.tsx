import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DashBoardPage } from '@/pages/Dashboard'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
}

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = createTestQueryClient()
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe('PurchaseFrequencySection 날짜 검증', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([]),
      }),
    )
  })

  it('시작일만 입력하고 적용 버튼을 누르면 에러 메시지가 표시된다', async () => {
    const user = userEvent.setup()
    renderWithProviders(<DashBoardPage />)

    const fromInput = screen.getByLabelText('시작일')
    await user.type(fromInput, '2024-01-01')

    const applyButton = screen.getByRole('button', { name: '날짜 적용' })
    await user.click(applyButton)

    expect(screen.getByText('시작일과 종료일을 모두 선택해주세요.')).toBeInTheDocument()
  })

  it('종료일만 입력하고 적용 버튼을 누르면 에러 메시지가 표시된다', async () => {
    const user = userEvent.setup()
    renderWithProviders(<DashBoardPage />)

    const toInput = screen.getByLabelText('종료일')
    await user.type(toInput, '2024-01-31')

    const applyButton = screen.getByRole('button', { name: '날짜 적용' })
    await user.click(applyButton)

    expect(screen.getByText('시작일과 종료일을 모두 선택해주세요.')).toBeInTheDocument()
  })

  it('시작일이 종료일보다 늦으면 에러 메시지가 표시된다', async () => {
    const user = userEvent.setup()
    renderWithProviders(<DashBoardPage />)

    const fromInput = screen.getByLabelText('시작일')
    const toInput = screen.getByLabelText('종료일')

    await user.type(fromInput, '2024-12-31')
    await user.type(toInput, '2024-01-01')

    const applyButton = screen.getByRole('button', { name: '날짜 적용' })
    await user.click(applyButton)

    expect(screen.getByText('시작일이 종료일보다 늦을 수 없습니다.')).toBeInTheDocument()
  })

  it('올바른 날짜 범위를 입력하면 에러 메시지가 표시되지 않는다', async () => {
    const user = userEvent.setup()
    renderWithProviders(<DashBoardPage />)

    const fromInput = screen.getByLabelText('시작일')
    const toInput = screen.getByLabelText('종료일')

    await user.type(fromInput, '2024-01-01')
    await user.type(toInput, '2024-12-31')

    const applyButton = screen.getByRole('button', { name: '날짜 적용' })
    await user.click(applyButton)

    expect(screen.queryByText('시작일과 종료일을 모두 선택해주세요.')).not.toBeInTheDocument()
    expect(screen.queryByText('시작일이 종료일보다 늦을 수 없습니다.')).not.toBeInTheDocument()
  })
})
