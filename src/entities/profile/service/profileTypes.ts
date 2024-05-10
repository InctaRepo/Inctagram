export interface UserInfo {
  aboutMe?: string
  avatar: string
  city: string
  country?: string
  dateOfBirth: Date
  firstName: string
  lastName: string
  userId?: string
  username: string
}

export type Avatar = {
  url: string
}
export type ProfileState = {
  ava: Avatar | null
  info: UserInfo | null
}
