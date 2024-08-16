import { RecoveryParams } from '@/features/auth/recovery/service/types/recoveryParams'
import { BaseResponse, baseApi } from '@/shared/api'
import { BASE_FRONT_URL } from '@/shared/const/const'

const passwordRecovery = baseApi.injectEndpoints({
  endpoints: build => ({
    passwordRecovery: build.mutation<
      BaseResponse<{
        email: string
      }>,
      RecoveryParams
    >({
      query: data => ({
        body: {
          ...data,
          baseUrl: BASE_FRONT_URL,
        },
        method: 'POST',
        url: 'auth/password-recovery',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { usePasswordRecoveryMutation } = passwordRecovery
