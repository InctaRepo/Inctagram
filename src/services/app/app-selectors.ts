import { RootState } from '@/src/services/store'

/**
 * Please name in this case : feature|SelectorName|Selector , example : app|IsLoading|Selector
 * for better readability and excluding export same selectors from different part of app
 */
export const appIsLoadingSelector = (state: RootState) => state.app.isLoading
export const appErrorSelector = (state: RootState) => state.app.error
