import { AppRootState } from '@/src/store'

export const getIsAuth = (state: AppRootState) => state.auth.isAuth
// export const getAuthUser = (state: AppRootState) => state.auth.user
// export const getAuthUserId = (state: AppRootState) => state.auth.user.userId
// export const getAuthEmail = (state: AppRootState) => state.auth.user.email
