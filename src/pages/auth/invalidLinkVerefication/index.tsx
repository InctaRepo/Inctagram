import TimeManagementImage from '@/src/assets/images/time-management-image'
import { AuthPage } from '@/src/components/auth/auth-page/AuthPage'
import { AuthLayout } from '@/src/components/Layout/AuthLayout'
const InvalidLinkVerification = () => {
  return (
    <AuthLayout>
      <AuthPage
        title="Email verification link invalid"
        text="Looks like the verification link has expired. Not to worry, we can send the link again"
        nameButton="Resend link"
      >
        {<TimeManagementImage />}
      </AuthPage>
    </AuthLayout>
  )
}

export default InvalidLinkVerification
