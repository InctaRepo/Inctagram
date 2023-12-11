import { AlertToast } from '@/src/shared/ui/alertToast'

export const useErrorToast = (isSuccess: boolean, error?: any, isSettings?: boolean) => {
  if (isSuccess) {
    AlertToast(false, isSettings ? 'Your settings are saved' : 'Success')
  }
  if (error) {
    AlertToast(true, error)
  }
}
