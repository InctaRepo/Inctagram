import { EmailVerification } from '@/src/features/auth/emailVerification'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const EmailVerificationPage = () => {
  return <EmailVerification />
}

EmailVerificationPage.getLayout = getAuthLayout
export default EmailVerificationPage
