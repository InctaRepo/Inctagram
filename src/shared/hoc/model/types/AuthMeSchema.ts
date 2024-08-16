export type AuthMeSchema = {
  authMeData: { userName?: string } & UserType
}
type UserType = {
  email?: string | undefined
  userId: null | string
  username?: string | undefined
}
