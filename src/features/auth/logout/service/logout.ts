import { AccessType } from '../../../auth/authService'
import { clearToken } from '../../signIn'

import { baseApi, BaseResponse } from '@/src/shared/api'

export const logout = baseApi.injectEndpoints({
  endpoints: build => ({
    logout: build.mutation<BaseResponse<AccessType>, void>({
      query: () => ({
        method: 'POST',
        url: 'auth/logout',
      }),
      invalidatesTags: ['Me'],
      //TODO
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data.resultCode === 0) {
            dispatch(clearToken())
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
