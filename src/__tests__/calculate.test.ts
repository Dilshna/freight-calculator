import { calculateFreight, validateForm, RATE_PER_CBM, DOCS_FEE, WEIGHT_DIVISOR } from '@/lib/calculate'

describe('calculateFreight', () => {
  it('uses weight CBM when it is higher than actual volume', () => {
    const result = calculateFreight(2000, 2, false)
    expect(result.weightCBM).toBe(4)
    expect(result.chargeableCBM).toBe(4)
    expect(result.freightCost).toBe(1060)
    expect(result.totalCost).toBe(1060)
  })

  it('uses actual volume when it is higher than weight CBM', () => {
    const result = calculateFreight(500, 5, false)
    expect(result.weightCBM).toBe(1)
    expect(result.chargeableCBM).toBe(5)
    expect(result.freightCost).toBe(5 * RATE_PER_CBM)
  })

  it('adds documentation fee when localDocs is true', () => {
    const result = calculateFreight(2000, 2, true)
    expect(result.docsCost).toBe(DOCS_FEE)
    expect(result.totalCost).toBe(1060 + DOCS_FEE)
  })

  it('does not add docs fee when localDocs is false', () => {
    const result = calculateFreight(2000, 2, false)
    expect(result.docsCost).toBe(0)
  })

  it('handles equal weight CBM and volume correctly', () => {
    const result = calculateFreight(1000, 2, false)
    expect(result.weightCBM).toBe(2)
    expect(result.chargeableCBM).toBe(2)
  })

  it('uses correct divisor constant', () => {
    expect(WEIGHT_DIVISOR).toBe(500)
  })
})

describe('validateForm', () => {
  it('returns no errors for valid input', () => {
    const errors = validateForm('2000', '3.5')
    expect(Object.keys(errors)).toHaveLength(0)
  })

  it('returns error for empty weight', () => {
    const errors = validateForm('', '3.5')
    expect(errors.grossWeight).toBeDefined()
  })

  it('returns error for zero weight', () => {
    const errors = validateForm('0', '3.5')
    expect(errors.grossWeight).toBeDefined()
  })

  it('returns error for negative weight', () => {
    const errors = validateForm('-100', '3.5')
    expect(errors.grossWeight).toBeDefined()
  })

  it('returns error for empty volume', () => {
    const errors = validateForm('2000', '')
    expect(errors.volume).toBeDefined()
  })

  it('returns errors for both fields when both invalid', () => {
    const errors = validateForm('', '')
    expect(errors.grossWeight).toBeDefined()
    expect(errors.volume).toBeDefined()
  })
})