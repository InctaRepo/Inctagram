import { EmailConfirmedDynamic } from '@/features/auth/emailConfirmed'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const EmailConfirmedPage = () => {
  return <EmailConfirmedDynamic />
}

EmailConfirmedPage.getLayout = getAuthLayout
export default EmailConfirmedPage
