import ConfirmedImage from '@/src/assets/images/email-confirmed-image'
import { AuthPage } from '@/src/components/auth/auth-page/AuthPage'
import { AuhtLayout } from '@/src/components/Layout/AuthLayout'
import { NextPageWithLayout } from '@/src/pages/_app'

const EmailConfirmed: NextPageWithLayout = () => {
  return (
    <AuhtLayout>
      <AuthPage title="Congratulations!" text="Your email has been confirmed" nameButton="Sign In">
        <ConfirmedImage />
      </AuthPage>
    </AuhtLayout>
  )
}

export default EmailConfirmed
