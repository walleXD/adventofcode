import { executeProgram } from './../src/alu'
import {
  OpCode,
  execute,
  Instruction,
  Register,
  AluState,
  initialState
} from '@/alu'

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
        state = execute(program[0], state)
        expect(state).toEqual({
          w: 1,
          x: 0,
          y: 0,
          z: 0
        })

        state = execute(program[1], state)
        expect(state).toEqual({
          w: 1,
          x: 0,
          y: 0,
          z: 0
        })
      })

      it('not eql', () => {
        state = execute(program[2])
        expect(state).toEqual({
          w: 0,
          x: 0,
          y: 0,
          z: 0
        })
      })
    })

    describe('add', () => {
      let program: Instruction[]
      let state: AluState

      beforeAll(() => {
        program = [
          [OpCode.add, Register.w, Register.x],
          [OpCode.add, Register.y, Register.z],
          [OpCode.add, Register.y, 1],
          [OpCode.add, Register.z, 1],
          [OpCode.add, Register.y, Register.z]
        ]

        state = initialState
      })

      it('add avles to register', () => {
        state = execute(program[0], state)
        expect(state).toEqual({
          w: 0,
          x: 0,
          y: 0,
          z: 0
        })

        state = execute(program[1], state)
        expect(state).toEqual({
          w: 0,
          x: 0,
          y: 0,
          z: 0
        })

        state = execute(program[2], state)
        expect(state).toEqual({
          w: 0,
          x: 0,
          y: 1,
          z: 0
        })

        state = execute(program[3], state)
        expect(state).toEqual({
          w: 0,
          x: 0,
          y: 1,
          z: 1
        })
      })

      it('add two registers', () => {
        state = execute(program[4], state)
        expect(state).toEqual({
          w: 0,
          x: 0,
          y: 2,
          z: 1
        })
      })
    })

    describe('mul', () => {
      let program: Instruction[]
      let state: AluState

      beforeAll(() => {
        program = [
          [OpCode.add, Register.w, 1],
          [OpCode.add, Register.x, 1],
          [OpCode.mul, Register.w, 10],
          [OpCode.mul, Register.x, 10],
          [OpCode.mul, Register.x, Register.w]
        ]

        state = initialState
      })

      it('mul basics', () => {
        state = execute(program[0], state)
        state = execute(program[1], state)
        state = execute(program[2], state)

        expect(state).toEqual({
          ...initialState,
          x: 1,
          w: 10
        })

        state = execute(program[3], state)
        expect(state).toEqual({
          ...initialState,
          x: 10,
          w: 10
        })
      })

      it('multiply registers', () => {
        state = execute(program[4], state)
        expect(state).toEqual({
          ...initialState,
          x: 100,
          w: 10
        })
      })
    })

    describe('divide', () => {
      let program: Instruction[]
      let state: AluState

      beforeAll(() => {
        program = [
          [OpCode.add, Register.w, 4],
          [OpCode.add, Register.x, 1],
          [OpCode.div, Register.w, 2],
          [OpCode.div, Register.x, 100],
          [OpCode.div, Register.x, Register.w]
        ]

        state = initialState
      })

      it('div basics', () => {
        state = execute(program[0], state)
        state = execute(program[1], state)
        state = execute(program[2], state)

        expect(state).toEqual({
          ...initialState,
          x: 1,
          w: 2
        })
      })

      it('divide by larged denominator', () => {
        state = execute(program[3], state)
        expect(state).toEqual({
          ...initialState,
          x: 0,
          w: 2
        })
      })

      it('divide by zero', () => {
        state = execute(program[4], state)
        expect(state).toEqual({ ...initialState, w: 2 })
      })
    })
  })

  describe('execute program', () => {
    let program: Instruction[]
    let state: AluState

    beforeAll(() => {
      program = [
        [OpCode.add, Register.w, 4],
        [OpCode.add, Register.x, 1],
        [OpCode.div, Register.w, 2],
        [OpCode.div, Register.x, 100],
        [OpCode.div, Register.x, Register.w]
      ]
    })

    it('execute list of instructions', () => {
      state = executeProgram(program)

      expect(state).toEqual({ ...initialState, w: 2 })
    })
  })
})
