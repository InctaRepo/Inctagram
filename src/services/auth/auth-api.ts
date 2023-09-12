import { createApi } from '@reduxjs/toolkit/query/react'

import { BaseResponseType } from '@/src/services'
import { appActions } from '@/src/services/app'
import {
  AccessType,
  LoginArgsType,
  NewPasswordArgsType,
  PasswordRecoveryType,
  RegisterArgsType,
  UserType,
} from '@/src/services/auth/auth-api-types'
import { authActions } from '@/src/services/auth/auth-slice'
import { baseQueryWithReauth } from '@/src/services/custom-fetch-base'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getMe: builder.query<BaseResponseType<UserType>, void>({
      query: () => 'auth/me',
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data.resultCode === 0) {
            dispatch(authActions.setIsAuth(true))
            dispatch(authActions.setUser(data.data))
          }
        } catch (e) {
          console.error(e)
        } finally {
          dispatch(appActions.setAppInitialized({ isInitialized: true }))
        }
      },
      extraOptions: { maxRetries: false },
    }),
    loginUser: builder.mutation<BaseResponseType<AccessType>, LoginArgsType>({
      query: data => ({
        method: 'POST',
        url: 'auth/login',
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data.resultCode === 0) {
            localStorage.setItem('access', data.data.accessToken)
            dispatch(authApi.endpoints?.getMe.initiate())
            // TODO: need fix - not working on every handler "login" from sign-in page, may be did from addMatcher in slice
          }
        } catch (e) {
          console.error(e)
        }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: 'auth/logout',
      }),
    }),
    register: builder.mutation<BaseResponseType, RegisterArgsType>({
      query: data => ({
        method: 'POST',
        url: 'auth/signup',
        body: data,
      }),
    }),
    createNewPassword: builder.mutation<BaseResponseType, NewPasswordArgsType>({
      query: data => ({
        method: 'POST',
        url: 'auth/new-password',
        body: data,
      }),
    }),
    passwordRecovery: builder.mutation<BaseResponseType, PasswordRecoveryType>({
      query: data => ({
        method: 'POST',
        url: 'auth/password-recovery',
        body: data,
      }),
    }),
    regConfirm: builder.mutation<BaseResponseType<AccessType>, { code: string }>({
      query: data => ({
        method: 'POST',
        url: 'auth/registration-confirmation',
        body: data,
      }),
    }),
  }),
})
export const {
  useRegisterMutation,
  useLoginUserMutation,
  usePasswordRecoveryMutation,
  useCreateNewPasswordMutation,
  useRegConfirmMutation,
  useLogoutUserMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
} = authApi
