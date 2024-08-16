import { BaseResponse, baseApi } from '@/shared/api'

import { RegistrationConfirmationParams } from './types'

export const registrationConfirmation = baseApi.injectEndpoints({
  endpoints: build => ({
    registrationConfirmation: build.mutation<
      BaseResponse<{ code: string }>,
      RegistrationConfirmationParams
    >({
      query: ({ code }) => ({
        body: {
          confirmationCode: code,
        },
        method: 'POST',
        url: 'auth/registration-confirmation',
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useRegistrationConfirmationMutation } = registrationConfirmation
