import TimeManagementImage from '@/src/assets/images/time-management-image'
import { AuthPage } from '../authPage/AuthPage'

export const InvalidLinkVerification = () => {
  return (
    <AuthPage
      title="Email verification link invalid"
      text="Looks like the verification link has expired. Not to worry, we can send the link again"
      nameButton="Resend link"
    >
      {<TimeManagementImage />}
    </AuthPage>
  )
}
