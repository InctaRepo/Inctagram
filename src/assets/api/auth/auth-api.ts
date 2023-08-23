import { baseApi } from '@/src/assets/api/base-api'
import {
  LoginArgsType,
  NewPasswordArgsType,
  PasswordRecoveryType,
  RegisterArgsType,
  RegRes,
} from '@/src/assets/api/types'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createUser: build.mutation<RegRes, RegisterArgsType>({
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
    passwordRecovery: build.mutation<any, PasswordRecoveryType>({
      query: data => ({
        method: 'POST',
        url: 'auth/password-recovery',
        body: data,
      }),
    }),
    loginUser: build.mutation<any, LoginArgsType>({
      query: data => ({
        method: 'POST',
        url: 'auth/login',
        body: data,
      }),
    }),
  }),
})
export const {
  useCreateUserMutation,
  useLoginUserMutation,
  usePasswordRecoveryMutation,
  useCreateNewPasswordMutation,
} = authApi
