import { RecoveryParams } from '@/features/auth/recovery/service/types/recoveryParams'
import { baseApi, BaseResponse } from '@/shared/api'

const emailRecovery = baseApi.injectEndpoints({
  endpoints: build => ({
    emailRecovery: build.mutation<
      BaseResponse<{
        email: string
      }>,
      RecoveryParams
    >({
      query: data => ({
        method: 'POST',
        url: 'auth/registration-email-resending',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useEmailRecoveryMutation } = emailRecovery
