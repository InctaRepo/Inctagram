import { getAuthLayout } from 'src/widgets/layout/authLayout'
import { EmailVerification } from '@/src/features/auth/emailVerification/ui/EmailVerification'

const EmailVerificationPage = () => {
  return <EmailVerification />
}

EmailVerificationPage.getLayout = getAuthLayout
export default EmailVerificationPage
