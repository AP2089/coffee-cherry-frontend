import type { CoffeeWeight } from '~/types'

export const WEIGHT_MULTIPLIER: Record<CoffeeWeight, number> = {
  250: 1,
  500: 1.9,
  1000: 3.6,
}

export function calcCoffeePrice(basePrice: number, weight: CoffeeWeight, qty = 1): number {
  return Math.round(basePrice * WEIGHT_MULTIPLIER[weight] * qty)
}
