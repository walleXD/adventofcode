import diveData, { simpleDiveFixture } from './fixtures/dive'
import {
  calculateDiveDistanceProduct,
  calculateDiveDistanceProductImproved
} from '../src/dive'

describe('dive', () => {
  describe('part 1', () => {
    it('handle simple dive data', () => {
      expect(calculateDiveDistanceProduct(simpleDiveFixture)).toEqual(150)
    })

    it('handle dive data', () => {
      const val = calculateDiveDistanceProduct(diveData)
      console.log(`dive val: ${val}`)

      expect(val).toBeGreaterThan(0)
    })
  })

  describe('part 2', () => {
    it('handle simple dive data', () => {
      expect(calculateDiveDistanceProductImproved(simpleDiveFixture)).toEqual(
        900
      )
    })

    it('handle dive data', () => {
      const val = calculateDiveDistanceProductImproved(diveData)
      console.log(`dive val: ${val}`)

      expect(val).toBeGreaterThan(0)
    })
  })
})
