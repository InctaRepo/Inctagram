import { StateSchema } from '@/store'

export const getToken = (state: StateSchema) => state.signIn.accessToken
