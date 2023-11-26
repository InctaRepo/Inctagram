import { baseApi } from '@/src/shared/api/baseApi'
import { BaseResponse } from '@/src/shared/api/baseResponse'
import { AccessType } from '../../../auth/authService'

export const logout = baseApi.injectEndpoints({
  endpoints: build => ({
    logout: build.mutation<BaseResponse<AccessType>, void>({
      query: () => ({
        method: 'POST',
        url: 'auth/logout',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data?.resultCode === 3) {
            localStorage.removeItem('access')
          }
        } catch (e) {
          console.error(e)
        }
      },
    }),
  }),
  overrideExisting: true,
})
export const { useLogoutMutation } = logout
