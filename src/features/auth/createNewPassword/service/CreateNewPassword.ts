import { baseApi } from '@/src/shared/api/baseApi'
import { BaseResponse } from '@/src/shared/api/baseResponse'
import { NewPasswordParams } from '../module/types/types'

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
