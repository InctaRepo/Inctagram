export type AuthMeSchema = {
  authMeData: UserType
}
type UserType = {
  userId: string
  username: string | undefined
  email: string | undefined
}
