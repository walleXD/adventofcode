import { calculatePowerConsumption } from '../src/diagnostic'
import diagnosticData, { simpleBinaryFixture } from './fixtures/diagnostic'

describe('diagnostics', () => {
  it('basic cal', () => {
    expect(calculatePowerConsumption(simpleBinaryFixture)).toBe(198)
  })

  it('cal power', () => {
    const val = calculatePowerConsumption(diagnosticData)
    console.log(`diagnostic val: ${val}`)

    expect(val).toBeGreaterThan(0)
  })
})
