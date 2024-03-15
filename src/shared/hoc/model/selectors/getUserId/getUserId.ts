import { StateSchema } from '@/store'

export const getUserId = (state: StateSchema) => state.authMe.authMeData?.userId ?? state.signIn.id
