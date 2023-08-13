import { instance } from './instances'

export const authAPI = {
  createUser(formData: RegisterArgsType) {
    console.log(formData)

    return instance.post('auth/signup', formData)
  },
}

//TYPES ====================================================================================
export type RegisterArgsType = {
  username: string
  email: string
  password: string
  passwordConfirm: string
}

export type ResponseType<D = {}> = {
  statusCode: number
  message: any
  error?: string
  data: D
}
