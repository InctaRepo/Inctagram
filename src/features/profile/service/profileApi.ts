// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profileSettings/service'
import { baseApi, BaseResponse } from '@/src/shared/api'

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<BaseResponse<UserInfo>, string | string[] | undefined>({
      query: id => ({
        method: 'GET',
        url: `users/profile/${id}`,
      }),
      providesTags: ['Profile'],
    }),
  }),
})

export const {
  useGetProfileQuery,
  util: { getRunningQueriesThunk },
} = profileApi

export const { getProfile } = profileApi.endpoints
