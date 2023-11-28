import { baseApi, BaseResponse } from '@/src/shared/api'
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
