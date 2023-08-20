import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from '@/src/assets/api/base-api'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})
