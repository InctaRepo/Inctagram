export {
  useGetProfileQuery,
  getProfile,
  getRunningQueriesThunk,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} from '@/entities/profile/service/profileApi'
export type { ProfileState, UserInfo, Avatar } from '@/entities/profile/service/profileTypes'
