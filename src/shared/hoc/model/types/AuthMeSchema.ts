export type AuthMeSchema = {
  authMeData: UserType
}
type UserType = {
  email?: string | undefined
  userId: null | string
  username?: string | undefined
}
