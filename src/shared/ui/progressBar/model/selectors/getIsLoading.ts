import { StateSchema } from '@/src/store'

export const getIsLoading = (state: StateSchema) => state.progressBar.isLoading
