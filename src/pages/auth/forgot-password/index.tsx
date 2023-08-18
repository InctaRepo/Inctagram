import React from 'react'

import { AuthLayout } from '@/src/components/Layout/AuthLayout'
import { ForgotPassword } from '@/src/components/ui/forgotPassword/ForgotPassword'

interface Props {}

const PasswordRecovery: React.FC<Props> = () => {
  return (
    <AuthLayout>
      <ForgotPassword />
    </AuthLayout>
  )
}

export default PasswordRecovery
