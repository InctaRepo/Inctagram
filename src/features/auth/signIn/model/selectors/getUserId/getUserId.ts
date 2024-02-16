import { StateSchema } from '@/store'

export const getUserId = (state: StateSchema) => state.signIn.id!
