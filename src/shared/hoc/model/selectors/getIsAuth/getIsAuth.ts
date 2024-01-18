import { AppRootState } from '@/src/store'

export const getIsAuth = (state: AppRootState) => state.authMe.authMeData?.userId.length > 1
