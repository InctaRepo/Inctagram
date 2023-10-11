export type UpdateProfileType = {
  username: string
  firstName: string
  lastName: string
  country: string
  city: string
  dateOfBirth: Date
  aboutMe: string
  avatar: string
  //avatar: AvatarType
}

export type AvatarType = {
  url: string
  /* x: number
  y: number*/
}