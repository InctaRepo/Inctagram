// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SignInSchema } from '@/features/auth/signIn'
import { loadState, saveState } from '@/shared/lib/localStorage'
import { StateSchema } from '@/store'

const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    clear: () => {
      store = {}
    },
    getItem: (key: string) => store[key],
    removeItem: (key: string) => {
      delete store[key]
    },
    setItem: (key: string, value: SignInSchema) => {
      store[key] = value.toString()
    },
  }
})()

beforeEach(() => {
  // Set up the localStorage mock before each test
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  })
})

describe('localStorage functions', () => {
  it('should load state correctly', () => {
    const mockState = { signIn: { accessToken: 'mockToken1', id: 'mockId1' } }

    localStorage.setItem('signIn', JSON.stringify(mockState))

    const loadedState = loadState()

    expect(loadedState).toEqual(mockState)
  })

  it('should save state correctly', () => {
    const mockState = { signIn: { accessToken: 'mockToken', id: 'mockId1' } } as StateSchema

    saveState(mockState)

    const savedState = JSON.parse(localStorage.getItem('signIn')!)

    expect(savedState).toEqual(mockState)
  })
})
