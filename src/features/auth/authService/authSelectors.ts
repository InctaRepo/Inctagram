// /**
//  * Please name in this case : feature|SelectorName|Selector , example : app|IsLoading|Selector
//  * for better readability and excluding export same selectors from different part of app
//  */
import { AppRootState } from '@/src/store'

export const getIsAuth = (state: AppRootState) => state.auth.isAuth
export const getAuthUser = (state: AppRootState) => state.auth.user
export const getAuthUserId = (state: AppRootState) => state.auth.user!.userId
export const getAuthEmail = (state: AppRootState) => state.auth.user!.email
