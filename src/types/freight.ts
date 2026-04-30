export interface ShipmentForm {
  grossWeight: string
  volume: string
  localDocs: boolean
}

export interface FreightResult {
  weightCBM: number
  actualCBM: number
  chargeableCBM: number
  freightCost: number
  docsCost: number
  totalCost: number
}

export interface FormErrors {
  grossWeight?: string
  volume?: string
}