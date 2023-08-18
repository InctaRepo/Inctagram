import React from 'react'

import { PasswordRecoveryType, usePasswordRecoveryMutation } from '@/src/assets/api/auth'
import { AuthLayout } from '@/src/components/Layout/AuthLayout'
import { ForgotPassword } from '@/src/components/ui/forgotPassword/ForgotPassword'

const PasswordRecovery = () => {
  const [passwordRecovery, {}] = usePasswordRecoveryMutation()

  const submit = (data: PasswordRecoveryType) => {
    passwordRecovery(data)
  }

  return (
    <AuthLayout>
      <ForgotPassword onSubmitHandler={submit} />
    </AuthLayout>
  )
}

export default PasswordRecovery
