import { StateSchema } from '@/store/types'

const KEY = 'accessToken'

export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY)

    if (!serializedState) return undefined

    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}

export async function saveState(state: StateSchema) {
  const signIn = state.signIn
  let lsData = { signIn }

  try {
    const serializedState = JSON.stringify(lsData)

    localStorage.setItem(KEY, serializedState)
  } catch (e) {
    // Ignore
  }
}
