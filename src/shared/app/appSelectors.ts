import { AppRootState } from '@/src/store'

export const appIsLoadingSelector = (state: AppRootState) => state.app.isLoading
export const appIsInitializedSelector = (state: AppRootState) => state.app.isInitialized
