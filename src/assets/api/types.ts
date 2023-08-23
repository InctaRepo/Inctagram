export type RegisterArgsType = {
  username: string
  email: string
  password: string
  passwordConfirm: string
}
export type RegRes = {
  resultCode: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  extensions: [
    {
      key: 'string'
      message: 'string'
    },
  ]
  data: null | Object
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
