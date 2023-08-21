import TimeManagementImage from '@/src/assets/images/time-management-image'
import { AuthPage } from '@/src/components/auth/auth-page/AuthPage'
import { AuhtLayout } from '@/src/components/Layout/AuthLayout'
const EmailVerification = () => {
  return (
    <AuhtLayout>
      <AuthPage
        title="Email verification link expired"
        text="Looks like the verification link has
                      expired. Not to worry, we can send the
                      link again"
        nameButton="Resend verification link"
      >
        {<TimeManagementImage />}
      </AuthPage>
    </AuhtLayout>
  )
}

export default EmailVerification
