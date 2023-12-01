import { StateSchema } from '@/src/store'

export const getUserEmail = (state: StateSchema) => state.authMe.authMeData?.email || ''
