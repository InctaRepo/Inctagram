import { AxiosInstance } from 'axios'

export class authAPI {
  constructor(private instance: AxiosInstance) {}

  public async createUser(formData: RegisterArgsType) {
    const res = await this.instance.post<any>('auth/signup', formData)

    return res.data
  }
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
