import { StateSchema } from '@/src/store'

export const getUserId = (state: StateSchema) => state.authMe.authMeData?.userId
