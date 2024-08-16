import { SignInSchema, setToken } from '@/features/auth/signIn'
import { SingInParams } from '@/features/auth/signIn/authByEmail'
import { baseApi } from '@/shared/api'

const authByEmail = baseApi.injectEndpoints({
  endpoints: build => ({
    signIn: build.mutation<SignInSchema, SingInParams>({
      invalidatesTags: ['Me', 'Profile'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data?.accessToken) {
            dispatch(setToken(data as SignInSchema))
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
