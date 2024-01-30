import { SignUpParams } from '@/features/auth/signUp/service/types/signUpParams'
import { baseApi, BaseResponse } from '@/shared/api'

export const signUp = baseApi.injectEndpoints({
  endpoints: build => ({
    signUp: build.mutation<BaseResponse<{ email: string }>, SignUpParams>({
      query: data => ({
        method: 'POST',
        url: 'auth/signup',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useSignUpMutation } = signUp
