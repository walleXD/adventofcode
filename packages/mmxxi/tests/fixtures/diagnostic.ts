import { readFileSync } from 'fs'
import { join } from 'path'

export const simpleBinaryFixture: string[] = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010'
]

export default readFileSync(join(__dirname, 'rawDiagnostic.txt'))
  .toString()
  .split('\n')
