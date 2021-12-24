import { OpCode, run, Instruction, Register } from '../src/alu'

describe('alu', () => {
  describe('op code', () => {
    describe('eql', () => {
      let program: Instruction[]

      beforeAll(() => {
        program = [
          [OpCode.eql, Register.w, 0],
          [OpCode.eql, Register.y, 1],
          [OpCode.eql, Register.y, 2]
        ]
      })

      it('should be eql', () => {
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
      })

      it('not eql', () => {
        const result3 = run(program[2])
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
