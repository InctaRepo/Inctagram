export {
  useGetProfileQuery,
  getProfile,
  getRunningQueriesThunk,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} from '@/src/entities/profile/service/profileApi'
export type { ProfileState, UserInfo, Avatar } from '@/src/entities/profile/service/profileTypes'
