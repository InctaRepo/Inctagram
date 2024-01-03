import { AccessType } from '@/src/features/auth/authService'
import { baseApi, BaseResponse } from '@/src/shared/api'

export const emailConfirmed = baseApi.injectEndpoints({
  endpoints: build => ({
    emailConfirmed: build.mutation<BaseResponse<AccessType>, { code: string }>({
      query: data => ({
        method: 'POST',
        url: 'auth/registration-confirmation',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useEmailConfirmedMutation } = emailConfirmed
