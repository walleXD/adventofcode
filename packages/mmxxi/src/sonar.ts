export default (sonarReadings: number[]): number => {
  return sonarReadings
    .map((reading, i, readings): number => {
      if (i === 0) {
        return -1
      }

      return readings[i - 1] < reading ? 1 : 0
    })
    .filter((val) => val > 0)
    .reduce((acc, val) => acc + val, 0)
}
