import { SignInSchema, clearToken } from '@/features/auth/signIn'
import { BaseResponse, baseApi } from '@/shared/api'
import { resultCode } from '@/shared/const'

const logout = baseApi.injectEndpoints({
  endpoints: build => ({
    logout: build.mutation<BaseResponse<SignInSchema>, void>({
      invalidatesTags: ['Me'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data.resultCode === resultCode.OK) {
            dispatch(clearToken())
          }
        } catch (e) {
          console.error(e)
        }
      },
      query: () => ({
        method: 'POST',
        url: 'auth/logout',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLogoutMutation } = logout
