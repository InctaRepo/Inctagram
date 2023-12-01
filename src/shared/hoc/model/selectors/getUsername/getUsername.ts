import { StateSchema } from '@/src/store'

export const getUsername = (state: StateSchema) => state.authMe.authMeData?.username || ''
