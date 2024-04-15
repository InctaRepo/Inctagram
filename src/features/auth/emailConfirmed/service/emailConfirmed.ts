import { SignInSchema } from '@/features/auth/signIn'
import { BaseResponse, baseApi } from '@/shared/api'

export const emailConfirmed = baseApi.injectEndpoints({
  endpoints: build => ({
    emailConfirmed: build.mutation<BaseResponse<SignInSchema>, { code: string }>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/registration-confirmation',
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useEmailConfirmedMutation } = emailConfirmed
