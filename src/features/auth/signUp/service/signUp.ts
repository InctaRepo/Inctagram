import { baseApi } from '@/src/shared/api/baseApi'
import { BaseResponse } from '@/src/shared/api/baseResponse'
import { RegisterArgsType } from '../../authService'

export const signUp = baseApi.injectEndpoints({
  endpoints: build => ({
    register: build.mutation<BaseResponse<{ email: string }>, RegisterArgsType>({
      query: data => ({
        method: 'POST',
        url: 'auth/signup',
        body: data,
      }),
    }),
  }),
  // overrideExisting: true,
})
export const { useRegisterMutation } = signUp
