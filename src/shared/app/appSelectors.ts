//
// /**
//  * Please name in this case : feature|SelectorName|Selector , example : app|IsLoading|Selector
//  * for better readability and excluding export same selectors from different part of app
//  */
import { AppRootState } from '@/src/store'

export const appIsLoadingSelector = (state: AppRootState) => state.app.isLoading
export const appIsInitializedSelector = (state: AppRootState) => state.app.isInitialized
