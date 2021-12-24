import { OpCode, run, Instruction } from '../src/alu'

describe('alu', () => {
  describe('op code', () => {
    describe('eql', () => {
      it('should be eql', () => {
        const program: Instruction[] = [
          [OpCode.eql, 'w', 0],
          [OpCode.eql, 'y', 1],
          [OpCode.eql, 'y', 0]
        ]

        const state = {
          w: 0,
          x: 0,
          y: 1,
          z: 0
        }

        const result = run(program[0])
        expect(result).toEqual({
          w: 1,
          x: 0,
          y: 0,
          z: 0
        })

        const result2 = run(program[1], state)
        expect(result2).toEqual({
          w: 0,
          x: 0,
          y: 1,
          z: 0
        })

        const result3 = run(program[2], result2)
        expect(result3).toEqual({
          w: 0,
          x: 0,
          y: 0,
          z: 0
        })
      })
    })
  })
})
