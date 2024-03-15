// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { baseApi, BaseResponse } from '@/shared/api'
import { resultCode } from '@/shared/const'
import { setAuthMeData } from '@/shared/hoc'
import { AuthMeResponse } from '@/shared/hoc/service/AuthMeResponse'

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
      },
    }),
  }),
  overrideExisting: false,
})

export const { useGetMeQuery } = authApi
