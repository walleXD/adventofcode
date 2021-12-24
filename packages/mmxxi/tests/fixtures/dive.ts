import type { Command } from 'dive'
import { readFileSync } from 'fs'
import { join } from 'path'

export const simpleDiveFixture: Command[] = [
  ['forward', 5],
  ['down', 5],
  ['forward', 8],
  ['up', 3],
  ['down', 8],
  ['forward', 2]
]

export default readFileSync(join(__dirname, 'rawDive.txt'))
  .toString()
  .split('\n')
  .map((s) => s.split(' '))
  .map((s) => [s[0], Number(s[1])] as Command)
