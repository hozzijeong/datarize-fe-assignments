import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchPurchaseFrequency } from '../queries/useFetchPurchaseFrequency'
import { PurchaseFrequencyError } from '../errors/PurchaseFrequencyError'

describe('fetchPurchaseFrequency', () => {
  const mockFetch = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    mockFetch.mockReset()
  })

  describe('API 에러 시 PurchaseFrequencyError를 throw 한다', () => {
    it('from만 있고 to가 없으면 MISSING_DATE_PARAM 에러를 throw 한다', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ error: 'Both from and to must be provided' }),
      })

      try {
        await fetchPurchaseFrequency({ from: '2024-01-01', to: '2024-01-31' })
        expect.fail('Expected error to be thrown')
      } catch (error) {
        expect(error).toBeInstanceOf(PurchaseFrequencyError)
        expect((error as PurchaseFrequencyError).code).toBe('MISSING_DATE_PARAM')
        expect((error as PurchaseFrequencyError).isDateError).toBe(true)
      }
    })

    it('잘못된 날짜 형식이면 INVALID_DATE_FORMAT 에러를 throw 한다', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ error: 'Invalid date format. Dates must be in ISO 8601 format' }),
      })

      try {
        await fetchPurchaseFrequency({ from: 'invalid', to: 'invalid' })
      } catch (error) {
        expect(error).toBeInstanceOf(PurchaseFrequencyError)
        expect((error as PurchaseFrequencyError).code).toBe('INVALID_DATE_FORMAT')
        expect((error as PurchaseFrequencyError).isDateError).toBe(true)
      }
    })

    it('시작일이 종료일보다 늦으면 INVALID_DATE_RANGE 에러를 throw 한다', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ error: 'From date must be before to date' }),
      })

      try {
        await fetchPurchaseFrequency({ from: '2024-12-31', to: '2024-01-01' })
      } catch (error) {
        expect(error).toBeInstanceOf(PurchaseFrequencyError)
        expect((error as PurchaseFrequencyError).code).toBe('INVALID_DATE_RANGE')
        expect((error as PurchaseFrequencyError).isDateError).toBe(true)
      }
    })

    it('서버 에러(500)면 SERVER_ERROR 에러를 throw 한다', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.resolve({}),
      })

      try {
        await fetchPurchaseFrequency()
      } catch (error) {
        expect(error).toBeInstanceOf(PurchaseFrequencyError)
        expect((error as PurchaseFrequencyError).code).toBe('SERVER_ERROR')
        expect((error as PurchaseFrequencyError).isDateError).toBe(false)
      }
    })

    it('상품을 찾을 수 없으면 PRODUCT_NOT_FOUND 에러를 throw 한다', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ error: 'Product with ID 999 not found' }),
      })

      try {
        await fetchPurchaseFrequency()
      } catch (error) {
        expect(error).toBeInstanceOf(PurchaseFrequencyError)
        expect((error as PurchaseFrequencyError).code).toBe('PRODUCT_NOT_FOUND')
        expect((error as PurchaseFrequencyError).isDateError).toBe(false)
      }
    })
  })

  describe('정상 응답', () => {
    it('성공 시 데이터를 반환한다', async () => {
      const mockData = [
        { range: '0 - 20000', count: 10 },
        { range: '20000 - 30000', count: 20 },
      ]

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      })

      const result = await fetchPurchaseFrequency()
      expect(result).toEqual(mockData)
    })
  })
})
