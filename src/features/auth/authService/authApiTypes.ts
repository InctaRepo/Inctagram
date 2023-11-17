export type RegisterArgsType = {
  username: string
  email: string
  password: string
  passwordConfirm: string
}

export type NewPasswordArgsType = {
  newPassword: string
  recoveryCode: string
}
export type PasswordRecoveryType = {
  email: string
}

export type LoginArgsType = {
  email: string
  password: string
}
export type UserType = {
  userId: string
  username: string
  email: string
} | null

export type AccessType = {
  accessToken: string
}
