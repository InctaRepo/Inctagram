import React from 'react'

import { AuthLayout } from '@/src/components/Layout/AuthLayout'
import { ForgotPassword } from '@/src/components/ui/forgotPassword/ForgotPassword'

interface Props {
  primary?: boolean | undefined
}

const PasswordRecovery: React.FC<Props> = ({ primary }) => {
  return (
    <AuthLayout>
      <ForgotPassword primary={primary} />
    </AuthLayout>
  )
}

export default PasswordRecovery
