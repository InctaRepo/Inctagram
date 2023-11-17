import { createApi } from '@reduxjs/toolkit/query/react'
import { appActions } from '@/src/shared/app'
import { baseQueryWithReAuth } from '@/src/shared/api/baseQueryWithReAuth'
import { BaseResponse } from '@/src/shared/api/baseResponse'
import {
  AccessType,
  LoginArgsType,
  NewPasswordArgsType,
  PasswordRecoveryType,
  UserType,
} from './authApiTypes'
import { authActions } from './authSlice'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Me'],
  endpoints: builder => ({
    getMe: builder.query<BaseResponse<UserType>, void>({
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
      providesTags: ['Me'],
      extraOptions: { maxRetries: false },
    }),
    loginUser: builder.mutation<BaseResponse<AccessType>, LoginArgsType>({
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
            dispatch(authApi.util.invalidateTags(['Me']))
            await dispatch(authApi.endpoints.getMe.initiate())
            // reQuery getMe, after login
          }
        } catch (e) {
          console.error(e)
        }
      },
    }),
    logoutUser: builder.mutation<BaseResponse<AccessType>, void>({
      query: () => ({
        method: 'POST',
        url: 'auth/logout',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data?.resultCode === 0) {
            localStorage.removeItem('access')
          }
        } catch (e) {
          console.error(e)
        }
      },
    }),
    // register: builder.mutation<BaseResponseType<{ email: string }>, RegisterArgsType>({
    //   query: data => ({
    //     method: 'POST',
    //     url: 'auth/signup',
    //     body: data,
    //   }),
    // }),
    createNewPassword: builder.mutation<BaseResponse, NewPasswordArgsType>({
      query: data => ({
        method: 'POST',
        url: 'auth/new-password',
        body: data,
      }),
    }),
    passwordRecovery: builder.mutation<BaseResponse, PasswordRecoveryType>({
      query: data => ({
        method: 'POST',
        url: 'auth/password-recovery',
        body: data,
      }),
    }),
    regConfirm: builder.mutation<
      BaseResponse<AccessType>,
      {
        code: string
      }
    >({
      query: data => ({
        method: 'POST',
        url: 'auth/registration-confirmation',
        body: data,
      }),
    }),
  }),
})
export const {
  useLoginUserMutation,
  usePasswordRecoveryMutation,
  useCreateNewPasswordMutation,
  useRegConfirmMutation,
  useLogoutUserMutation,
  useGetMeQuery,
} = authApi
