import ConfirmedImage from '@/src/assets/images/email-confirmed-image'
import { AuthPage } from '@/src/components/auth/auth-page/AuthPage'
import { AuthLayout, getAuthLayout } from '@/src/components/Layout/AuthLayout'
import { NextPageWithLayout } from '@/src/pages/_app'

const EmailConfirmed: NextPageWithLayout = () => {
  return (
    <AuthLayout>
      <AuthPage title="Congratulations!" text="Your email has been confirmed" nameButton="Sign In">
        <ConfirmedImage />
      </AuthPage>
    </AuthLayout>
  )
}

export default EmailConfirmed
