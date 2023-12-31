import { AccessType } from '@/src/features/auth/authService'
import { clearToken } from '@/src/features/auth/signIn'
import { baseApi, BaseResponse } from '@/src/shared/api'
import { resultCode } from '@/src/shared/const'

const logout = baseApi.injectEndpoints({
  endpoints: build => ({
    logout: build.mutation<BaseResponse<AccessType>, void>({
      query: () => ({
        method: 'POST',
        url: 'auth/logout',
      }),
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
    }),
  }),
  overrideExisting: true,
})

export const { useLogoutMutation } = logout
