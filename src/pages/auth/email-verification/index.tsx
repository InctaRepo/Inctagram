import { EmailVerificationDynamic } from '@/features/auth/emailVerification'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const EmailVerificationPage = () => <EmailVerificationDynamic />

EmailVerificationPage.getLayout = GetAuthLayout
export default EmailVerificationPage
