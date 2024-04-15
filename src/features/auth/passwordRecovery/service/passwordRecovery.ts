import { RecoveryParams } from '@/features/auth/recovery/service/types/recoveryParams'
import { BaseResponse, baseApi } from '@/shared/api'

const passwordRecovery = baseApi.injectEndpoints({
  endpoints: build => ({
    passwordRecovery: build.mutation<
      BaseResponse<{
        email: string
      }>,
      RecoveryParams
    >({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/password-recovery',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { usePasswordRecoveryMutation } = passwordRecovery
