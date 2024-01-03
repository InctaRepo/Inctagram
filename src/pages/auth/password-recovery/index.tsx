import { PasswordRecoveryDynamic } from '@/src/features/auth/passwordRecovery'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const PasswordRecoveryPage = () => {
  return <PasswordRecoveryDynamic />
}

PasswordRecoveryPage.getLayout = getAuthLayout
export default PasswordRecoveryPage
