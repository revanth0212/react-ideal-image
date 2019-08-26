import {combineCancel, timeout, imageLoader} from '../components/loaders'

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

    return result.then(data => {
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

    return result.then(data => {
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

describe('Testing timeout', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  test('timeout should return a promise', () => {
    expect(timeout(0) instanceof Promise).toBeTruthy()
  })

  test('timeout should return a promise that should resolve after the given timeout', () => {
    const dummyFn = jest.fn()
    const result = timeout(100)

    expect.assertions(2)

    result.then(() => {
      dummyFn()
    })

    expect(dummyFn).not.toBeCalled()

    jest.runAllTimers()

    return result.then(() => {
      expect(dummyFn).toHaveBeenCalledTimes(1)
    })
  })

  test('timeout should return a promise that should resolve without any arguments', () => {
    const dummyFn = jest.fn()
    const result = timeout(100)

    result.then((...args) => {
      dummyFn(...args)
    })

    jest.runAllTimers()

    expect.assertions(1)

    return result.then(() => {
      expect(dummyFn).toHaveBeenCalledWith(undefined)
    })
  })

  test('timeout should return a promise that has cancel function', () => {
    expect(timeout(100).cancel instanceof Function).toBeTruthy()
  })

  test('if cancel is called before timeout period, timeout should not be called', () => {
    const dummyFn = jest.fn()
    const result = timeout(1000)

    result.then(() => {
      dummyFn()
    })

    jest.advanceTimersByTime(100)

    result.cancel()

    jest.runAllTimers()

    expect(dummyFn).not.toBeCalled()
  })
})

describe('Testing imageLoader', () => {
  const FAILURE_SRC = ''
  const SUCCESS_SRC = 'https://avatars1.githubusercontent.com/u/35203638?v=4'

  beforeAll(() => {
    // eslint-disable-next-line accessor-pairs
    Object.defineProperty(global.Image.prototype, 'src', {
      set(src) {
        if (src === FAILURE_SRC) {
          setTimeout(() => this.onerror(new Error('mocked error')), 1000)
        } else if (src === SUCCESS_SRC) {
          setTimeout(() => {
            this.onload()
          }, 1000)
        }
      },
    })
  })

  beforeEach(() => {
    jest.useFakeTimers()
  })

  test('imageLoader should return a promise', () => {
    expect(imageLoader(FAILURE_SRC) instanceof Promise).toBeTruthy()
  })

  test('promise returned by imageLoader should have cancel function', () => {
    expect(imageLoader(FAILURE_SRC).cancel instanceof Function).toBeTruthy()
  })

  test('imageLoader should not add any img nodes to the document', () => {
    expect(document.getElementsByTagName('img')).toHaveLength(0)

    imageLoader(SUCCESS_SRC)

    expect(document.getElementsByTagName('img')).toHaveLength(0)
  })

  test.skip('if a valid source is given, the promise returned by imageLoader should resolve', () => {
    let tempValue = 'original'

    const result = imageLoader(SUCCESS_SRC)

    result.then(() => {
      tempValue = 'modified'
    })

    jest.runAllTimers()

    return expect(tempValue).toBe('modified')
  })

  test('if cancel function is called on the returned promise, the promise should not be resolved', () => {
    const result = imageLoader(SUCCESS_SRC)

    let tempValue = 'original'

    result.cancel()

    result.then(() => {
      tempValue = 'modified'
    })

    return expect(tempValue).toBe('original')
  })
})
