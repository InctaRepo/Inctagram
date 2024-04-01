import { PasswordRecoveryDynamic } from '@/features/auth/passwordRecovery'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const PasswordRecoveryPage = () => <PasswordRecoveryDynamic />

PasswordRecoveryPage.getLayout = GetAuthLayout
export default PasswordRecoveryPage
