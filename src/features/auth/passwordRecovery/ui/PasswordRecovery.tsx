import { usePasswordRecoveryMutation } from '@/features/auth/passwordRecovery/service/passwordRecovery'
import { Recovery } from '@/features/auth/recovery'

export const PasswordRecovery = () => {
  const [passwordRecovery] = usePasswordRecoveryMutation()

  return <Recovery recoveryMutation={passwordRecovery} type={'password'} />
}
