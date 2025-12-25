import { describe, it, expect } from 'vitest'
import { PurchaseFrequencyError } from '../errors/PurchaseFrequencyError'

describe('PurchaseFrequencyError', () => {
  describe('에러 코드 분류', () => {
    it('from, to 둘 중 하나만 있으면 MISSING_DATE_PARAM 코드를 반환한다', () => {
      const error = new PurchaseFrequencyError('Failed', 400, 'Both from and to must be provided')
      expect(error.code).toBe('MISSING_DATE_PARAM')
      expect(error.isDateError).toBe(true)
    })

    it('잘못된 날짜 형식이면 INVALID_DATE_FORMAT 코드를 반환한다', () => {
      const error = new PurchaseFrequencyError('Failed', 400, 'Invalid date format. Dates must be in ISO 8601 format')
      expect(error.code).toBe('INVALID_DATE_FORMAT')
      expect(error.isDateError).toBe(true)
    })

    it('시작일이 종료일보다 늦으면 INVALID_DATE_RANGE 코드를 반환한다', () => {
      const error = new PurchaseFrequencyError('Failed', 400, 'From date must be before to date')
      expect(error.code).toBe('INVALID_DATE_RANGE')
      expect(error.isDateError).toBe(true)
    })

    it('상품을 찾을 수 없으면 PRODUCT_NOT_FOUND 코드를 반환한다', () => {
      const error = new PurchaseFrequencyError('Failed', 400, 'Product with ID 999 not found')
      expect(error.code).toBe('PRODUCT_NOT_FOUND')
      expect(error.isDateError).toBe(false)
    })

    it('서버 에러(500)면 SERVER_ERROR 코드를 반환한다', () => {
      const error = new PurchaseFrequencyError('Failed', 500)
      expect(error.code).toBe('SERVER_ERROR')
      expect(error.isDateError).toBe(false)
    })

    it('알 수 없는 에러면 UNKNOWN_ERROR 코드를 반환한다', () => {
      const error = new PurchaseFrequencyError('Failed', 400, 'Unknown error')
      expect(error.code).toBe('UNKNOWN_ERROR')
      expect(error.isDateError).toBe(false)
    })
  })

  describe('isDateError', () => {
    it('날짜 관련 에러 코드면 true를 반환한다', () => {
      const missingParam = new PurchaseFrequencyError('Failed', 400, 'Both from and to must be provided')
      const invalidFormat = new PurchaseFrequencyError(
        'Failed',
        400,
        'Invalid date format. Dates must be in ISO 8601 format',
      )
      const invalidRange = new PurchaseFrequencyError('Failed', 400, 'From date must be before to date')

      expect(missingParam.isDateError).toBe(true)
      expect(invalidFormat.isDateError).toBe(true)
      expect(invalidRange.isDateError).toBe(true)
    })

    it('날짜 관련 에러가 아니면 false를 반환한다', () => {
      const productNotFound = new PurchaseFrequencyError('Failed', 400, 'Product with ID 1 not found')
      const serverError = new PurchaseFrequencyError('Failed', 500)
      const unknownError = new PurchaseFrequencyError('Failed', 400)

      expect(productNotFound.isDateError).toBe(false)
      expect(serverError.isDateError).toBe(false)
      expect(unknownError.isDateError).toBe(false)
    })
  })
})
