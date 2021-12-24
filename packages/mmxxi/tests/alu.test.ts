import prompt from 'readline-sync'
import {
  OpCode,
  execute,
  Instruction,
  Register,
  AluState,
  initialState,
  executeProgram,
  runAlu
} from '@/alu'

describe('alu', () => {
  describe('op code', () => {
    describe('inp', () => {
      let program: Instruction[]
      let state: AluState

      beforeAll(() => {
        program = [[OpCode.inp, Register.w, 0]]

        state = initialState

        prompt.questionInt = jest.fn().mockReturnValue(42)
      })

      it('should prompt for input', () => {
        state = executeProgram(program, state)

        expect(state).toEqual({
          ...initialState,
          w: 42
        })

        expect(prompt.questionInt).toHaveBeenCalledTimes(1)
      })
    })

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

    describe('mod', () => {
      let program: Instruction[]
      let state: AluState

      beforeAll(() => {
        program = [
          [OpCode.add, Register.w, 4],
          [OpCode.mod, Register.w, 2],
          [OpCode.add, Register.y, 5],
          [OpCode.add, Register.x, 2],
          [OpCode.mod, Register.y, Register.x],
          [OpCode.mod, Register.x, Register.w]
        ]
      })

      it('simple', () => {
        state = executeProgram(program, initialState, 0, 1)

        expect(state).toEqual({
          ...initialState,
          w: 0
        })
      })

      it('mod registers', () => {
        state = executeProgram(program, state, 2, 4)

        expect(state).toEqual({
          ...initialState,
          w: 0,
          x: 2,
          y: 1
        })
      })

      it('mod by zero', () => {
        state = executeProgram(program, state, 5)

        expect(state).toEqual({
          ...initialState,
          w: 0,
          y: 1,
          x: 0
        })
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
      state = runAlu(program)

      expect(state).toEqual({ ...initialState, w: 2 })
    })

    it('can start and stop executing from specific points in program', () => {
      state = executeProgram(program, initialState, 0, 1)

      expect(state).toEqual({
        ...initialState,
        w: 4,
        x: 1
      })
    })
  })
})
