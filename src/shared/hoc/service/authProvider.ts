import { baseApi, BaseResponse } from '@/src/shared/api'
import { resultCode } from '@/src/shared/const'
import { setAuthMeData } from '@/src/shared/hoc'
import { AuthMeResponse } from '@/src/shared/hoc/service/AuthMeResponse'

const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getMe: build.query<BaseResponse<AuthMeResponse>, void>({
      query: () => 'auth/me',
      providesTags: ['Me'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data?.resultCode === resultCode.OK) {
            dispatch(setAuthMeData({ authMeData: data.data }))
          }
        } catch (e) {
          console.error(e)
        }
        // finally {
        //   dispatch(setAppInitialized({ isInitialized: true }))
        // }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useGetMeQuery } = authApi
