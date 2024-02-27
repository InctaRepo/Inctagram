import { EmailVerificationDynamic } from '@/features/auth/emailVerification'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const EmailVerificationPage = () => <EmailVerificationDynamic />

EmailVerificationPage.getLayout = getAuthLayout
export default EmailVerificationPage
