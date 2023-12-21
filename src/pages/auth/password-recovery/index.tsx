import { PasswordRecovery } from '@/src/features/auth/passwordRecovery'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const PasswordRecoveryPage = () => {
  return <PasswordRecovery />
}

PasswordRecoveryPage.getLayout = getAuthLayout
export default PasswordRecoveryPage
