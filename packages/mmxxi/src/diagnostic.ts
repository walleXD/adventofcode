export const calculatePowerConsumption = (report: string[]): number => {
  const reportMatrix = report.map((line) =>
    line.split('').map((int) => Number(int))
  )

  return (
    reportMatrix[0]
      // flip the matrix
      .map((_, index) => reportMatrix.map((row) => row[index]).reverse())
      // count number of zeros and ones in each row
      .reduce<number[][]>((acc, row) => {
        const val = row.reduce<number[]>(
          ([zero, one], int) => {
            if (int === 0) {
              return [zero + 1, one]
            }

            return [zero, one + 1]
          },
          [0, 0]
        )

        return [...acc, val]
      }, [])
      // return row associated patterns for gamma and epsilon
      .map(([zeroCount, oneCount]) => {
        if (zeroCount > oneCount) {
          return [0, 1]
        }
        return [1, 0]
      })
      // create gamma and epsilon
      .reduce<string[]>((acc, [gammaBit, epsilonBit]) => {
        if (acc.length === 0) {
          return [gammaBit.toString(), epsilonBit.toString()]
        }

        return [acc[0] + gammaBit.toString(), acc[1] + epsilonBit.toString()]
      }, [])
      // convert to decimal
      .map((str) => Number(`0b${str}`))
      // calculate power consumption
      .reduce((acc, int) => acc * int, 1)
  )
}
