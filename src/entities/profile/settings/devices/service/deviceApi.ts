import { Device } from '@/src/entities/profile/settings/devices/service/deviceApiTypes'
import { baseApi, BaseResponse } from '@/src/shared/api'

export const deviceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSessions: builder.query<BaseResponse<Device[]>, void>({
      query: () => ({
        method: 'GET',
        url: `auth/sessions`,
      }),
      providesTags: ['Device'],
    }),
    deleteAllSessions: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: `auth/sessions`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Device'],
    }),
    deleteThisSessions: builder.mutation<BaseResponse, string>({
      query: (deviceId: string) => ({
        url: `auth/sessions/${deviceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Device'],
    }),
  }),
})

export const { useGetSessionsQuery, useDeleteAllSessionsMutation, useDeleteThisSessionsMutation } =
  deviceApi
