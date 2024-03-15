import { StateSchema } from '@/store'

export const getIsAuth = (state: StateSchema) => state.authMe.authMeData?.userId != null
