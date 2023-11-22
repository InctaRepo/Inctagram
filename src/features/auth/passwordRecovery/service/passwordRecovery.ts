import { baseApi } from '@/src/shared/api/baseApi'
import { BaseResponse } from '@/src/shared/api/baseResponse'
import { PasswordRecoveryParams } from '../model/types/types'

export const passwordRecovery = baseApi.injectEndpoints({
  endpoints: build => ({
    passwordRecovery: build.mutation<BaseResponse<{ email: string }>, PasswordRecoveryParams>({
      query: data => ({
        method: 'POST',
        url: 'auth/password-recovery',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})
export const { usePasswordRecoveryMutation } = passwordRecovery
