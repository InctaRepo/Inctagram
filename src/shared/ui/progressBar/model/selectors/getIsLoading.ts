import { StateSchema } from '@/store'

export const getIsLoading = (state: StateSchema) => state.progressBar.isLoading
