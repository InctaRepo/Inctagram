import { SignInSchema } from '@/features/auth/signIn'
import { baseApi, BaseResponse } from '@/shared/api'

export const emailConfirmed = baseApi.injectEndpoints({
  endpoints: build => ({
    emailConfirmed: build.mutation<BaseResponse<SignInSchema>, { code: string }>({
      query: data => ({
        method: 'POST',
        url: 'auth/registration-confirmation',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useEmailConfirmedMutation } = emailConfirmed
