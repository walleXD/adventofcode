import {
  OpCode,
  run,
  Instruction,
  Register,
  AluState,
  initialState
} from '../src/alu'

describe('alu', () => {
  describe('op code', () => {
    describe('eql', () => {
      let program: Instruction[]
      let state: AluState

      beforeAll(() => {
        program = [
          [OpCode.eql, Register.w, 0],
          [OpCode.eql, Register.y, 1],
          [OpCode.eql, Register.y, 2]
        ]

        state = initialState
      })

      it('should be eql', () => {
        state = run(program[0], state)
        expect(state).toEqual({
          w: 1,
          x: 0,
          y: 0,
          z: 0
        })

        state = run(program[1], state)
        expect(state).toEqual({
          w: 1,
          x: 0,
          y: 0,
          z: 0
        })
      })

      it('not eql', () => {
        state = run(program[2])
        expect(state).toEqual({
          w: 0,
          x: 0,
          y: 0,
          z: 0
        })
      })
    })
  })
})
