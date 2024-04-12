import { NewPasswordParams } from '@/features/auth/createNewPassword/service/types/newPasswordParams'
import { BaseResponse, baseApi } from '@/shared/api'

const createNewPasswordApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createNewPassword: build.mutation<BaseResponse, NewPasswordParams>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'auth/new-password',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useCreateNewPasswordMutation } = createNewPasswordApi
