import { recurse, Trampoline, trampolined, value } from './utils'
import prompt from 'readline-sync'

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

export interface AluStateRaw {
  [Register.w]: number
  [Register.x]: number
  [Register.y]: number
  [Register.z]: number
}

export interface AluState extends Readonly<AluStateRaw> {}

export type Instruction = Readonly<
  [OpCode, Register, Register | number | undefined]
>

export const initialState: AluState = {
  w: 0,
  x: 0,
  y: 0,
  z: 0
}

export const extractValue = (state: AluState, b: Register | number): number => {
  return typeof b !== 'number' ? state[b] : b
}

export const execute = (
  [opcode, a, b]: Instruction,
  state: AluState = initialState,
  inputFn?: () => number
): AluState => {
  switch (opcode) {
    case OpCode.inp: {
      const aVal =
        inputFn !== undefined
          ? inputFn()
          : prompt.questionInt(`Enter value for ${a}: `)

      return { ...state, [a]: aVal }
    }

    case OpCode.eql: {
      const isEql = state[a] === (b !== undefined && extractValue(state, b))

      return { ...state, [a]: isEql ? 1 : 0 }
    }

    case OpCode.add: {
      if (b === undefined) {
        throw new Error('add instruction requires a second operand')
      }

      return {
        ...state,
        [a]: state[a] + extractValue(state, b)
      }
    }

    case OpCode.mul: {
      if (b === undefined) {
        throw new Error('add instruction requires a second operand')
      }

      return {
        ...state,
        [a]: state[a] * extractValue(state, b)
      }
    }

    case OpCode.div: {
      if (b === undefined) {
        throw new Error('add instruction requires a second operand')
      }

      const bVal = extractValue(state, b)

      return { ...state, [a]: (state[a] / bVal) | 0 }
    }

    case OpCode.mod: {
      if (b === undefined) {
        throw new Error('add instruction requires a second operand')
      }
      const bVal = extractValue(state, b)

      return { ...state, [a]: state[a] % bVal | 0 }
    }
    default:
      return state
  }
}

const createExecuteProgram = (
  program: Program,
  state: AluState = initialState,
  counter = 0,
  endCounter?: number
): Trampoline<AluState> => {
  const nextState = execute(program[counter], state)

  return counter < (endCounter ?? program.length - 1)
    ? recurse(() =>
        createExecuteProgram(program, nextState, counter + 1, endCounter)
      )
    : value(nextState)
}

export const executeProgram = trampolined(createExecuteProgram)

export type Program = Readonly<Instruction[]>

export const convertTextToProgram = (text: string): Program =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => [...line.split(' ')])
    .map<Instruction>(([opcode, a, b]) => {
      return [
        opcode as OpCode,
        a as Register,
        ...((b !== undefined
          ? [isNaN(parseInt(b, 10)) ? (b as Register) : parseInt(b, 10)]
          : []) as [Register | number | undefined])
      ]
    })

export const runAlu = (
  program: Program,
  state: AluState = initialState
): AluState => executeProgram(program, state)

export const alu = (program: Instruction[]): void => {}

export const run = (text: string): AluState => {
  const program = convertTextToProgram(text)
  return runAlu(program)
}
