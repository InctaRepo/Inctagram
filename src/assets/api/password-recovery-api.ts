import { instance } from './instances'

export const authAPI = {
  passwordRecovery(formData: IncomingDataType) {
    return instance.post('auth/password-recovery', formData)
  },
}

// TYPES ========================================================
type IncomingDataType = {
  email: string
}

type ResponseType = {
  statusCode: number
}
