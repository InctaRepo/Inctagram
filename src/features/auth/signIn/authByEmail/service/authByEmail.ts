import { setToken, SignInSchema } from '@/features/auth/signIn'
import { SingInParams } from '@/features/auth/signIn/authByEmail'
import { baseApi, BaseResponse } from '@/shared/api'
import { resultCode } from '@/shared/const'

const authByEmail = baseApi.injectEndpoints({
  endpoints: build => ({
    signIn: build.mutation<BaseResponse<SignInSchema>, SingInParams>({
      query: data => ({
        method: 'POST',
        url: 'auth/login',
        body: data,
      }),
      invalidatesTags: ['Me', 'Profile'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data?.resultCode === resultCode.OK) {
            dispatch(setToken(data.data))
          }
        } catch (e) {
          console.error(e)
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useSignInMutation } = authByEmail
