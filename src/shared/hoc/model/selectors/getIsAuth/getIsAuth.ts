import { StateSchema } from '@/src/store'

export const getIsAuth = (state: StateSchema) => state.authMe.authMeData?.userId.length > 1
