export type UpdateProfileType = {
  username: string
  firstName: string
  lastName: string
  country: string
  city: string
  dateOfBirth: string
  aboutMe: string
  avatar: string
  //avatar: Avatar
}

export type Avatar = {
  url: string
  x: number
  y: number
}
