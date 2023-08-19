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

export type ResponseType<D = {}> = {
  statusCode: number
  message: any
  error?: string
  data: D
}
export type LoginArgsType = {
  email: string
  password: string
}
