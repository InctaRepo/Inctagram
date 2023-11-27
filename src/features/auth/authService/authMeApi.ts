import { appActions } from '@/src/shared/app'
import { baseApi, BaseResponse } from '@/src/shared/api'
import { UserType } from './authApiTypes'
import { setIsAuth, setUser } from './authSlice'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getMe: build.query<BaseResponse<UserType>, void>({
      query: () => 'auth/me',
      providesTags: ['Me'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data.resultCode === 0) {
            dispatch(setIsAuth(true))
            dispatch(setUser(data.data))
          }
        } catch (e) {
          console.error(e)
        } finally {
          dispatch(appActions.setAppInitialized({ isInitialized: true }))
        }
      },
    }),
  }),
})

export const { useGetMeQuery } = authApi
