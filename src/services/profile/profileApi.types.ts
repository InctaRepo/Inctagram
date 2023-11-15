export interface UserInfo {
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

export type Avatar = {
  url: string
}
