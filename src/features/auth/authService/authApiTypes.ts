export type AccessType = {
  accessToken: string
}
export type AuthState = {
  user: UserType | null
  isAuth: boolean
}
export type UserType = {
  userId: string
  username: string | undefined
  email: string | undefined
}
