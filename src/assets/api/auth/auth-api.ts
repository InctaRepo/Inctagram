import { instance } from 'src/assets/api/instances'

export const authAPI = {
  createUser(formData: RegisterArgsType) {
    return instance.post('auth/signup', formData)
  },
}

export const newPasswordAPI = {
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
  recoveryCode: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
}

export type ResponseType<D = {}> = {
  statusCode: number
  message: any
  error?: string
  data: D
}
