import { RecoveryParams } from '@/features/auth/recovery/service/types/recoveryParams'
import { BaseResponse, baseApi } from '@/shared/api'

const emailRecovery = baseApi.injectEndpoints({
  endpoints: build => ({
    emailRecovery: build.mutation<
      BaseResponse<{
        email: string
      }>,
      RecoveryParams
    >({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/registration-email-resending',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useEmailRecoveryMutation } = emailRecovery
