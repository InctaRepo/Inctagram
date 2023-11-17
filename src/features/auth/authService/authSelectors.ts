// /**
//  * Please name in this case : feature|SelectorName|Selector , example : app|IsLoading|Selector
//  * for better readability and excluding export same selectors from different part of app
//  */
import { AppRootState } from '@/src/store'

export const authIsAuthSelector = (state: AppRootState) => state.auth.isAuth
export const authUserSelector = (state: AppRootState) => state.auth.user
