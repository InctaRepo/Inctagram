import { baseApi } from '@/src/assets/api/base-api'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createUser: build.mutation<any, RegisterArgsType>({
      query: data => ({
        method: 'POST',
        url: 'auth/signup',
        body: data,
      }),
    }),
    createNewPassword: build.mutation<any, NewPasswordArgsType>({
      query: data => ({
        method: 'POST',
        url: 'auth/new-password',
        body: data,
      }),
    }),
  }),
})
export const { useCreateUserMutation, useCreateNewPasswordMutation } = authApi

//TYPES ====================================================================================
export type RegisterArgsType = {
  username: string
  email: string
  password: string
  passwordConfirm: string
}

export type NewPasswordArgsType = {
  newPassword: string
  recoveryCode: string
}

export type ResponseType<D = {}> = {
  statusCode: number
  message: any
  error?: string
  data: D
}
