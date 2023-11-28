import TimeManagementImage from 'public/icon/timeMenegmentIcon.svg'
import { AuthPage } from '../../authPage'

export const InvalidLinkVerification = () => {
  return (
    <AuthPage
      title="Email verification link invalid"
      text="Looks like the verification link has expired. Not to worry, we can send the link again"
      nameButton="Resend link"
    >
      <TimeManagementImage />
    </AuthPage>
  )
}
