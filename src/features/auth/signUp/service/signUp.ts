import { SignUpParams } from '@/features/auth/signUp/service/types/signUpParams'
import { BaseResponse, baseApi } from '@/shared/api'
import { BASE_FRONT_URL } from '@/shared/const/const'

export const signUp = baseApi.injectEndpoints({
  endpoints: build => ({
    signUp: build.mutation<BaseResponse<{ email: string }>, SignUpParams>({
      query: ({ username: userName, ...data }) => ({
        body: {
          ...data,
          baseUrl: BASE_FRONT_URL,
          userName,
        },
        method: 'POST',
        url: 'auth/registration',
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useSignUpMutation } = signUp
