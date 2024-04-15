import { Device } from '@/entities/profile/settings/devices/service/deviceApiTypes'
import { BaseResponse, baseApi } from '@/shared/api'

export const deviceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteAllSessions: builder.mutation<BaseResponse, void>({
      invalidatesTags: ['Device'],
      query: () => ({
        method: 'DELETE',
        url: `auth/sessions`,
      }),
    }),
    deleteThisSessions: builder.mutation<BaseResponse, string>({
      invalidatesTags: ['Device'],
      query: (deviceId: string) => ({
        method: 'DELETE',
        url: `auth/sessions/${deviceId}`,
      }),
    }),
    getSessions: builder.query<BaseResponse<Device[]>, void>({
      providesTags: ['Device'],
      query: () => ({
        method: 'GET',
        url: `auth/sessions`,
      }),
    }),
  }),
})

export const { useDeleteAllSessionsMutation, useDeleteThisSessionsMutation, useGetSessionsQuery } =
  deviceApi
