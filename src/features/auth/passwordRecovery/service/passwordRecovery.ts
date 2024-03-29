import { RecoveryParams } from '@/features/auth/recovery/service/types/recoveryParams'
import { baseApi, BaseResponse } from '@/shared/api'

const passwordRecovery = baseApi.injectEndpoints({
  endpoints: build => ({
    passwordRecovery: build.mutation<
      BaseResponse<{
        email: string
      }>,
      RecoveryParams
    >({
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
