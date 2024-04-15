export {
  getProfile,
  getRunningQueriesThunk,
  useCreateProfileMutation,
  useDeleteAvatarMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from '@/entities/profile/service/profileApi'
export type { Avatar, ProfileState, UserInfo } from '@/entities/profile/service/profileTypes'
