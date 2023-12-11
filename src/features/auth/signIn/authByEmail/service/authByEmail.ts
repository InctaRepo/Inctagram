import { AccessType } from '@/src/features/auth/authService'
import { setToken } from '@/src/features/auth/signIn'
import { SingInParams } from '@/src/features/auth/signIn/authByEmail'
import { baseApi, BaseResponse } from '@/src/shared/api'

export const authByEmail = baseApi.injectEndpoints({
  endpoints: build => ({
    signIn: build.mutation<BaseResponse<AccessType>, SingInParams>({
      query: data => ({
        method: 'POST',
        url: 'auth/login',
        body: data,
      }),
      invalidatesTags: ['Me'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data.resultCode === 0) {
            dispatch(setToken(data.data))
          }
        } catch (e) {
          console.error(e)
        }
      },
    }),
  }),
})
export const { useSignInMutation } = authByEmail
