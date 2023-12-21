import { baseApi, BaseResponse } from '@/src/shared/api'
import { NewPasswordParams } from 'src/features/auth/createNewPassword/service/types/newPasswordParams'

const createNewPassword = baseApi.injectEndpoints({
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
