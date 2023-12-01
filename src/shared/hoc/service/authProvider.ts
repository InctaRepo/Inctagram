// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { setIsAuth } from '@/src/features/auth/authService'
import { baseApi, BaseResponse } from '../../api'
import { appActions } from '../../app'
import { setAuthMeData } from '../model/slice/authMeSlice'
import { AuthMeResponse } from './AuthMeResponse'

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
          dispatch(appActions.setAppInitialized({ isInitialized: true }))
        }
      },
    }),
  }),
  overrideExisting: true,
})

export const { useGetMeQuery } = authApi
