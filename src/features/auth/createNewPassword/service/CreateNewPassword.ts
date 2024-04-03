import { NewPasswordParams } from '@/features/auth/createNewPassword/service/types/newPasswordParams'
import { baseApi, BaseResponse } from '@/shared/api'

const createNewPasswordApi = baseApi.injectEndpoints({
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

export const { useCreateNewPasswordMutation } = createNewPasswordApi
