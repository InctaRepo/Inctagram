import { baseApi, BaseResponse } from '@/src/shared/api'
import { AccessType, authApi } from '../../../authService'
import { SingInParams } from '../index'

export const authByEmail = baseApi.injectEndpoints({
  endpoints: build => ({
    signIn: build.mutation<BaseResponse<AccessType>, SingInParams>({
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
  }),
})
export const { useSignInMutation } = authByEmail
