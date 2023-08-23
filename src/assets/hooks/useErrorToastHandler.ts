import { alertToast } from '@/src/components/ui/alert'

export const useErrorToastHandler = (isSuccess: boolean, error: any) => {
  if (isSuccess) {
    alertToast(false, 'Success')
  }
  if (error) {
    alertToast(true, error)
  }
}
