import {combineCancel} from '../components/loaders'

describe('Testing combineCancel', () => {
  test('combineCancel should return a promise', () => {
    const dummyFn = () => {}

    const result = combineCancel(new Promise(dummyFn), new Promise(dummyFn))

    expect(result instanceof Promise).toBeTruthy()
  })

  test('combineCancel should return first argument if second argument is not provided', () => {
    const p1 = new Promise(() => {})

    const result = combineCancel(p1)

    expect(result).toBe(p1)
  })

  test('result of combineCancel should resolve to the same value that p1 was resolved with', () => {
    const resolveValue = 1
    const p1 = new Promise(resolve => {
      setTimeout(() => {
        resolve(resolveValue)
      })
    })

    const result = combineCancel(p1, new Promise(() => {}))

    result.then(data => {
      expect(data).toBe(resolveValue)
    })
  })

  test('result of combineCancel should resolve to the same value that p1 was rejected with', () => {
    const rejectValue = 2
    const p1 = new Promise((_, reject) => {
      setTimeout(() => {
        reject(rejectValue)
      })
    })

    const result = combineCancel(p1, new Promise(() => {}))

    result.then(data => {
      expect(data).toBe(rejectValue)
    })
  })

  test('cancel of the result of combineCancel should run cancel of both the parameters', () => {
    const p1Cancel = jest.fn()
    const p2Cancel = jest.fn()
    const p1 = new Promise(() => {})
    const p2 = new Promise(() => {})

    p1.cancel = p1Cancel
    p2.cancel = p2Cancel

    const result = combineCancel(p1, p2)

    result.cancel()

    expect(p1Cancel).toHaveBeenCalledTimes(1)
    expect(p2Cancel).toHaveBeenCalledTimes(1)
  })
})