export type UserInfoType = {
  id?: string
  username: string
  firstName: string
  lastName: string
  country: string
  city: string
  dateOfBirth: Date
  aboutMe: string
  avatar: string
} | null

export type AvatarType = {
  url: string
  /* x: number
  y: number*/
}
