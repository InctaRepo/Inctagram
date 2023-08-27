import ConfirmedImage from '@/src/assets/images/email-confirmed-image'
import { AuthPage } from '@/src/components/auth/auth-page/AuthPage'
import { AuthLayout } from '@/src/components/layout/auth-layout'
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
