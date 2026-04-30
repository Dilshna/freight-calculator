import type { FreightResult } from '@/types/freight'

export const RATE_PER_CBM = 265
export const DOCS_FEE = 150
export const WEIGHT_DIVISOR = 500

export function calculateFreight(
  grossWeight: number,
  volume: number,
  localDocs: boolean
): FreightResult {
  const weightCBM = grossWeight / WEIGHT_DIVISOR
  const chargeableCBM = Math.max(weightCBM, volume)
  const freightCost = chargeableCBM * RATE_PER_CBM
  const docsCost = localDocs ? DOCS_FEE : 0

  return {
    weightCBM,
    actualCBM: volume,
    chargeableCBM,
    freightCost,
    docsCost,
    totalCost: freightCost + docsCost,
  }
}

export function validateForm(
  grossWeight: string,
  volume: string
): Record<string, string> {
  const errors: Record<string, string> = {}
  const w = parseFloat(grossWeight)
  const v = parseFloat(volume)

  if (!grossWeight || isNaN(w) || w <= 0)
    errors.grossWeight = 'Enter a valid weight greater than 0'
  if (!volume || isNaN(v) || v <= 0)
    errors.volume = 'Enter a valid volume greater than 0'

  return errors
}