import { AlertToast } from '@/src/components/ui/alert'

export const useErrorToast = (isSuccess: boolean, error?: any, isSettings?: boolean) => {
  if (isSuccess) {
    AlertToast(false, isSettings ? 'Your settings are saved' : 'Success')
  }
  if (error) {
    AlertToast(true, error)
  }
}
