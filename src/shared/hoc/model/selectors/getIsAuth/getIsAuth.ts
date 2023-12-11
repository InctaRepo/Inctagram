import { AppRootState } from '@/src/store'

export const getIsAuth = (state: AppRootState) => state.auth.isAuth
