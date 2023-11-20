import { baseApi } from '@/src/shared/api/baseApi'
import { BaseResponse } from '@/src/shared/api/baseResponse'
import { SignUpParams } from '../model/types/types'

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
