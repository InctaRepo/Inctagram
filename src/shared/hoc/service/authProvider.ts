// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { BaseResponse, baseApi } from '@/shared/api'
import { resultCode } from '@/shared/const'
import { setAuthMeData } from '@/shared/hoc'
import { AuthMeResponse } from '@/shared/hoc/service/AuthMeResponse'

const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getMe: build.query<BaseResponse<AuthMeResponse>, void>({
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data?.resultCode === resultCode.OK) {
            dispatch(setAuthMeData({ authMeData: data.data }))
          }
        } catch (e) {
          console.error(e)
        }
      },
      providesTags: ['Me'],
      query: () => 'auth/me',
    }),
  }),
  overrideExisting: false,
})

export const { useGetMeQuery } = authApi
