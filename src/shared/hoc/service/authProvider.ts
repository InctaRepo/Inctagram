// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { setIsAuth } from '@/src/features/auth/authService'
import { baseApi, BaseResponse } from '@/src/shared/api'
import { setAppInitialized } from '@/src/shared/app'
import { setAuthMeData } from '@/src/shared/hoc/model/slice/authMeSlice'
import { AuthMeResponse } from '@/src/shared/hoc/service/AuthMeResponse'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getMe: build.query<BaseResponse<AuthMeResponse>, void>({
      query: () => 'auth/me',
      providesTags: ['Me'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data) {
            dispatch(setAuthMeData({ authMeData: data.data }))
          }
          if (data.resultCode === 0) {
            dispatch(setAuthMeData({ authMeData: data.data }))
            dispatch(setIsAuth(true))
          }
        } catch (e) {
          console.error(e)
        } finally {
          dispatch(setAppInitialized({ isInitialized: true }))
        }
      },
    }),
  }),
  overrideExisting: true,
})

export const { useGetMeQuery } = authApi
