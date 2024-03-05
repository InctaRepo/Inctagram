import React from 'react'

import { useEmailRecoveryMutation } from '@/features/auth/emailVerification/service/emailRecovery'
import { Recovery } from '@/features/auth/recovery'

export const EmailVerification = () => {
  const [emailRecovery] = useEmailRecoveryMutation()

  return <Recovery recoveryMutation={emailRecovery} type={'email'} />
}
