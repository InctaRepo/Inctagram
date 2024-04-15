import { SignInSchema, setToken } from '@/features/auth/signIn'
import { SingInParams } from '@/features/auth/signIn/authByEmail'
import { BaseResponse, baseApi } from '@/shared/api'
import { resultCode } from '@/shared/const'

const authByEmail = baseApi.injectEndpoints({
  endpoints: build => ({
    signIn: build.mutation<BaseResponse<SignInSchema>, SingInParams>({
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
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/login',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useSignInMutation } = authByEmail
