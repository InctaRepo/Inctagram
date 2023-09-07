import { AlertToast } from '@/src/components/ui/alert'

export const useErrorToast = (isSuccess: boolean, error?: any) => {
  if (isSuccess) {
    AlertToast(false, 'Success')
  }
  if (error) {
    AlertToast(true, error)
  }
}
