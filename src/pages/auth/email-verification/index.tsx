import { EmailVerificationDynamic } from '@/src/features/auth/emailVerification'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const EmailVerificationPage = () => {
  return <EmailVerificationDynamic />
}

EmailVerificationPage.getLayout = getAuthLayout
export default EmailVerificationPage
