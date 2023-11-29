import { getAuthLayout } from 'src/widgets/layout/authLayout'
import { EmailConfirmed } from '@/src/features/auth/emailConfirmed/ui/EmailConfirmed'

const EmailConfirmedPage = () => {
  return <EmailConfirmed />
}

EmailConfirmedPage.getLayout = getAuthLayout
export default EmailConfirmedPage
