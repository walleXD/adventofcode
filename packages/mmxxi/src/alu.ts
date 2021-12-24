export interface AluState {
  w: number
  x: number
  y: number
  z: number
}

const initialState: AluState = {
  w: 0,
  x: 0,
  y: 0,
  z: 0
}

export enum OpCode {
  inp = 'inp',
  add = 'add',
  mul = 'mul',
  div = 'div',
  mod = 'mod',
  eql = 'eql'
}

export type Registers = 'w' | 'x' | 'y' | 'z'

export type Instruction = [OpCode, Registers, number | Registers]

export const run = (
  [opcode, a, b]: Instruction,
  state: AluState = initialState
): AluState => {
  switch (opcode) {
    case OpCode.eql: {
      const bVal = typeof b !== 'number' ? state[b] : b

      const isEql = state[a] === bVal
      return { ...state, [a]: isEql ? 1 : 0 }
    }

    default:
      return state
  }
}

export const alu = (program: Instruction[]): void => {}
