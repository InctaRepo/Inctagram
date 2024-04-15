import { StateSchema } from '@/store/types'

const mapKey = ['signIn']
const key = mapKey[0]

export function loadState() {
  try {
    const serializedState = localStorage.getItem(key)

    if (!serializedState) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}

export async function saveState(state: StateSchema) {
  const signIn = state.signIn

  mapKey.forEach(key => {
    let lsData

    if (key === 'signIn') {
      lsData = { signIn }
    }
    try {
      const serializedState = JSON.stringify(lsData)

      localStorage.setItem(key, serializedState)
    } catch (e) {
      // Ignore
    }
  })
}
