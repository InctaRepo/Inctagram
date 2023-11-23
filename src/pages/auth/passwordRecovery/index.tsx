import { getAuthLayout } from 'src/widgets/layout/authLayout'
import { PasswordRecovery } from '@/src/features/auth/passwordRecovery/ui/PasswordRecovery'

const PasswordRecoveryPage = () => {
  return <PasswordRecovery />
}

PasswordRecoveryPage.getLayout = getAuthLayout
export default PasswordRecoveryPage
