import { StateSchema } from '@/store'

export const getUsername = (state: StateSchema) => state.authMe.authMeData?.username || ''
