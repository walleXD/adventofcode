export enum OpCode {
  inp = 'inp',
  add = 'add',
  mul = 'mul',
  div = 'div',
  mod = 'mod',
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

export type Instruction = [OpCode, Register, Register | number | undefined]

export const initialState: AluState = {
  w: 0,
  x: 0,
  y: 0,
  z: 0
}

export const run = (
  [opcode, a, b]: Instruction,
  state: AluState = initialState
): AluState => {
  switch (opcode) {
    case OpCode.eql: {
      const isEql =
        state[a] === (b !== undefined && typeof b !== 'number' ? state[b] : b)
      return { ...state, [a]: isEql ? 1 : 0 }
    }

    default:
      return state
  }
}

export const alu = (program: Instruction[]): void => {}
