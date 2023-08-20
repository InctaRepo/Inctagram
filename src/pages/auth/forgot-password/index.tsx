import React from 'react'

import { PasswordRecoveryType, usePasswordRecoveryMutation } from '@/src/assets/api/auth'
import { AuhtLayout } from '@/src/components/Layout/AuthLayout'
import { ForgotPassword } from '@/src/components/ui/forgotPassword/ForgotPassword'

const PasswordRecovery = () => {
  const [passwordRecovery, {}] = usePasswordRecoveryMutation()

  const submit = (data: PasswordRecoveryType) => {
    passwordRecovery(data)
  }

  return (
    <AuhtLayout>
      <ForgotPassword onSubmitHandler={submit} />
    </AuhtLayout>
  )
}

export default PasswordRecovery
