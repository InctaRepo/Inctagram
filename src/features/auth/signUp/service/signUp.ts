import { SignUpParams } from '../model/types/types'

import { baseApi, BaseResponse } from '@/src/shared/api'

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
