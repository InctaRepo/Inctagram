export interface UserInfoType {
  id?: string
  username: string
  firstName: string
  lastName: string
  country: string
  city: string
  dateOfBirth: Date
  aboutMe: string
  avatar: string
}

export type AvatarType = {
  url: string
}
