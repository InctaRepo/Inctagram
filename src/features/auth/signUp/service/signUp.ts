import { SignUpParams } from '@/features/auth/signUp/service/types/signUpParams'
import { BaseResponse, baseApi } from '@/shared/api'

export const signUp = baseApi.injectEndpoints({
  endpoints: build => ({
    signUp: build.mutation<BaseResponse<{ email: string }>, SignUpParams>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/signup',
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useSignUpMutation } = signUp
