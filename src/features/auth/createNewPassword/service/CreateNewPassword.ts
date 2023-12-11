import { NewPasswordParams } from '../module/types/newPasswordParams'

import { baseApi, BaseResponse } from '@/src/shared/api'

export const createNewPassword = baseApi.injectEndpoints({
  endpoints: build => ({
    createNewPassword: build.mutation<BaseResponse, NewPasswordParams>({
      query: data => ({
        method: 'POST',
        url: 'auth/new-password',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useCreateNewPasswordMutation } = createNewPassword
