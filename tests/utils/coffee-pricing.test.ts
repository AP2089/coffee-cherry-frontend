import { describe, expect, it } from 'vitest'
import { calcCoffeePrice, WEIGHT_MULTIPLIER } from '~/utils/coffee-pricing'

describe('coffee-pricing', () => {
  it('exposes weight multipliers', () => {
    expect(WEIGHT_MULTIPLIER[250]).toBe(1)
    expect(WEIGHT_MULTIPLIER[500]).toBe(1.9)
    expect(WEIGHT_MULTIPLIER[1000]).toBe(3.6)
  })

  it('calculates unit price for each weight', () => {
    expect(calcCoffeePrice(1000, 250)).toBe(1000)
    expect(calcCoffeePrice(1000, 500)).toBe(1900)
    expect(calcCoffeePrice(1000, 1000)).toBe(3600)
  })

  it('multiplies by quantity', () => {
    expect(calcCoffeePrice(1000, 250, 3)).toBe(3000)
    expect(calcCoffeePrice(1000, 500, 2)).toBe(3800)
  })

  it('rounds fractional results', () => {
    expect(calcCoffeePrice(333, 500)).toBe(633)
  })
})
