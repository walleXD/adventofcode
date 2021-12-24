export enum OpCode {
  /**
   * `inp a` - Read an input value and write it
   * to variable `a`
   */
  inp = 'inp',
  /**
   * `add a b` - Add the value of `a` to the value of `b`,
   * then store the result in variable `a`.
   */
  add = 'add',
  /**
   * `mul a b` - Multiply the value of a by the value
   * of `b`, then store the result in variable `a`
   */
  mul = 'mul',
  /**
   * `div a b` - Divide the value of a by the value of `b`,
   * truncate the result to an integer, then store the result
   * in variable `a`. (Here, "truncate" means to round the value toward zero.)
   */
  div = 'div',
  /**
   * `mod a b` - Divide the value of a by the value of b,
   * then store the remainder in variable a
   */
  mod = 'mod',
  /**
   * `eql a b` - If the value of a and b are equal,
   * then store the value 1 in variable a. Otherwise, store the value 0 in variable a
   */
  eql = 'eql'
}

export enum Register {
  w = 'w',
  x = 'x',
  y = 'y',
  z = 'z'
}

export interface AluState {
  [Register.w]: number
  [Register.x]: number
  [Register.y]: number
  [Register.z]: number
}

export type Instruction = Readonly<
  [OpCode, Register, Register | number | undefined]
>

export const initialState: AluState = {
  w: 0,
  x: 0,
  y: 0,
  z: 0
}

export const execute = (
  [opcode, a, b]: Instruction,
  state: AluState = initialState
): AluState => {
  switch (opcode) {
    case OpCode.eql: {
      const isEql =
        state[a] === (b !== undefined && typeof b !== 'number' ? state[b] : b)
      return { ...state, [a]: isEql ? 1 : 0 }
    }

    case OpCode.add: {
      if (b === undefined) {
        throw new Error('add instruction requires a second operand')
      }

      const result = state[a] + (typeof b !== 'number' ? state[b] : b)
      return { ...state, [a]: result }
    }

    case OpCode.mul: {
      if (b === undefined) {
        throw new Error('add instruction requires a second operand')
      }

      const result = state[a] * (typeof b !== 'number' ? state[b] : b)
      return { ...state, [a]: result }
    }

    default:
      return state
  }
}

export const alu = (program: Instruction[]): void => {}
