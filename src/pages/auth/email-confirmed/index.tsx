import { EmailConfirmedDynamic } from '@/features/auth/emailConfirmed'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const EmailConfirmedPage = () => <EmailConfirmedDynamic />

EmailConfirmedPage.getLayout = GetAuthLayout
export default EmailConfirmedPage
