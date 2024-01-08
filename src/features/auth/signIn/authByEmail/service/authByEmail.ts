import { AccessType } from '@/src/features/auth/authService'
import { setToken } from '@/src/features/auth/signIn'
import { SingInParams } from '@/src/features/auth/signIn/authByEmail'
import { baseApi, BaseResponse } from '@/src/shared/api'
import { resultCode } from '@/src/shared/const'

const authByEmail = baseApi.injectEndpoints({
  endpoints: build => ({
    signIn: build.mutation<BaseResponse<AccessType>, SingInParams>({
      query: data => ({
        method: 'POST',
        url: 'auth/login',
        body: data,
      }),
      invalidatesTags: ['Me', 'Profile'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data?.resultCode === resultCode.OK) {
            dispatch(setToken(data.data))
          }
          // if (data?.resultCode === resultCode.UNAUTHORIZED) {
          //   dispatch(setIsAuth(false))
          // }
        } catch (e) {
          console.error(e)
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useSignInMutation } = authByEmail
