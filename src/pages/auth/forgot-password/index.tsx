import React from 'react'

import { usePasswordRecoveryMutation } from '@/src/assets/api/auth'
import { PasswordRecoveryType } from '@/src/assets/api/types'
import { useErrorToastHandler } from '@/src/assets/hooks/useErrorToastHandler'
import { AuthLayout } from '@/src/components/Layout/AuthLayout'
import { ForgotPassword } from '@/src/components/ui/forgot-password/ForgotPassword'

const PasswordRecovery = () => {
  const [passwordRecovery, { isSuccess, error }] = usePasswordRecoveryMutation()

  useErrorToastHandler(isSuccess, error)

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
