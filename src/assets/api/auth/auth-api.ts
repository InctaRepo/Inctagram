import { instance } from 'src/assets/api/instances'

export const authAPI = {
  createUser(formData: RegisterArgsType) {
    return instance.post('auth/signup', formData)
  },
  createNewPassword(formData: NewPasswordArgsType) {
    return instance.post('auth/new-password', formData)
  },
}

//TYPES ====================================================================================
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

export type ResponseType<D = {}> = {
  statusCode: number
  message: any
  error?: string
  data: D
}
