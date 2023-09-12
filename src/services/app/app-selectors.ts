import { AppRootStateType } from '@/src/services'
//
// /**
//  * Please name in this case : feature|SelectorName|Selector , example : app|IsLoading|Selector
//  * for better readability and excluding export same selectors from different part of app
//  */
export const appIsLoadingSelector = (state: AppRootStateType) => state.app.isLoading
export const appIsInitializedSelector = (state: AppRootStateType) => state.app.isInitialized
