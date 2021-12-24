import sonarFixture, { simpleSonarFixture } from './fixtures/sonar'
import countSonarIncreasingTrend from '../src/sonar'

describe('Sonar', () => {
  it('handle simple sonar data', () => {
    expect(countSonarIncreasingTrend(simpleSonarFixture)).toEqual(7)
  })

  it('handle sonar data', () => {
    const val = countSonarIncreasingTrend(sonarFixture)
    console.log(`val: ${val}`)

    expect(val).toBeGreaterThan(0)
  })
})
