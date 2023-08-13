import { authAPI } from '@/src/assets/api/auth-api'
import { instance } from '@/src/assets/api/instances'

const auth = new authAPI(instance)

export const API = {
  authAPI: auth,
}
