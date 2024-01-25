import { StateSchema } from '@/store'

export const getUserEmail = (state: StateSchema) => state.authMe.authMeData?.email || ''
