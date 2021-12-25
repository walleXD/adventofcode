export type Trampoline<A> = Recurse<A> | Value<A>

export interface Recurse<A> {
  _tag: 'Recurse'
  recurse: () => Trampoline<A>
}

export interface Value<A> {
  _tag: 'Value'
  value: A
}

export const recurse = <A>(f: () => Trampoline<A>): Recurse<A> => ({
  _tag: 'Recurse',
  recurse: f
})

export const value = <A>(a: A): Value<A> => ({ _tag: 'Value', value: a })

export const trampolined =
  <T extends readonly unknown[], A>(f: (...t: T) => Trampoline<A>) =>
  (...t: T): A => {
    let result = f(...t)

    while (true) {
      switch (result._tag) {
        case 'Recurse':
          result = result.recurse()
          break
        case 'Value':
          return result.value
      }
    }
  }
