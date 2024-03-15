export type AuthMeSchema = {
  authMeData: UserType
}
type UserType = {
  userId: string | null
  username?: string | undefined
  email?: string | undefined
}
