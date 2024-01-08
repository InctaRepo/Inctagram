import { EmailConfirmedDynamic } from '@/src/features/auth/emailConfirmed'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const EmailConfirmedPage = () => {
  return <EmailConfirmedDynamic />
}

EmailConfirmedPage.getLayout = getAuthLayout
export default EmailConfirmedPage
