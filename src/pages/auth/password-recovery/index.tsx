import { PasswordRecoveryDynamic } from '@/features/auth/passwordRecovery'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const PasswordRecoveryPage = () => {
  return <PasswordRecoveryDynamic />
}

PasswordRecoveryPage.getLayout = getAuthLayout
export default PasswordRecoveryPage
