export type Command = ['up' | 'down' | 'forward', number]

export const calculateDiveDistanceProduct = (commands: Command[]): number => {
  return commands
    .reduce(
      ([horizontal, vertical], [command, distance]) => {
        switch (command) {
          case 'up':
            return [horizontal, vertical - distance]
          case 'down':
            return [horizontal, vertical + distance]
          case 'forward':
            return [horizontal + distance, vertical]
          default:
            return [horizontal, vertical]
        }
      },
      [0, 0]
    )
    .reduce((acc, val) => acc * val, 1)
}

export const calculateDiveDistanceProductImproved = (
  commands: Command[]
): number => {
  return commands
    .reduce(
      ([horizontal, vertical, aim], [command, distance]) => {
        switch (command) {
          case 'up':
            return [horizontal, vertical, aim - distance]
          case 'down':
            return [horizontal, vertical, aim + distance]
          case 'forward':
            return [horizontal + distance, vertical + aim * distance, aim]
          default:
            return [horizontal, vertical, aim]
        }
      },
      [0, 0, 0]
    )
    .slice(0, 2)
    .reduce((acc, val) => acc * val, 1)
}
