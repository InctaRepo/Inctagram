import {
  LoginArgsType,
  NewPasswordArgsType,
  PasswordRecoveryType,
  RegisterArgsType,
} from './auth-api-types'

import { ResponseType } from '@/src/services'
import { baseApi } from '@/src/services/base-api'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createUser: build.mutation<ResponseType<{}>, RegisterArgsType>({
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
    logoutUser: build.mutation<any, null>({
      query: () => ({
        // sent refresh in cookie
        method: 'POST',
        url: 'auth/logout',
        body: null,
      }),
    }),
    regConfirm: build.mutation<ResponseType<{ accessToken: string }>, { code: string }>({
      query: data => ({
        method: 'POST',
        url: 'auth/registration-confirmation',
        body: data,
      }),
    }),

    // refreshToken: build.mutation<ResponseType<{ accessToken: string }>, null>({
    //   query: () => ({
    //     headers: {'Authorization', `Bearer ${token}`} ,
    //     // sent refresh in cookie
    //     method: 'POST',
    //     url: 'auth/refresh-token',
    //     body: null,
    //   }),
    // }),
  }),
})
export const {
  useCreateUserMutation,
  useLoginUserMutation,
  usePasswordRecoveryMutation,
  useCreateNewPasswordMutation,
  useRegConfirmMutation,
  useLogoutUserMutation,
  // useRefreshTokenMutation,
} = authApi
