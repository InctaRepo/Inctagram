import { EmailConfirmed } from '@/src/features/auth/emailConfirmed'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const EmailConfirmedPage = () => {
  return <EmailConfirmed />
}

EmailConfirmedPage.getLayout = getAuthLayout
export default EmailConfirmedPage
