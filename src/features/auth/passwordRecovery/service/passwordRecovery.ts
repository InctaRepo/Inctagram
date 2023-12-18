import { PasswordRecoveryParams } from '@/src/features/auth/passwordRecovery/service/types/passwordRecoveryParams'
import { baseApi, BaseResponse } from '@/src/shared/api'

const passwordRecovery = baseApi.injectEndpoints({
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
