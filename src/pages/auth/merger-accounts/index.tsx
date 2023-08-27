import React from 'react'

import MergerImage from '@/src/assets/images/merger-image'
import { AuthPage } from '@/src/components/auth/auth-page/AuthPage'
import { AuthLayout } from '@/src/components/layout/auth-layout'

const MergerAccounts = () => {
  return (
    <AuthLayout>
      <AuthPage
        title="Merger of Accounts"
        text="The user with email Epam@epam.com is already in the system. Could we merge this accounts?"
        nameButton="Yes, merge"
        nameButtonTwo="No"
        variant="merger"
      >
        {<MergerImage />}
      </AuthPage>
    </AuthLayout>
  )
}

export default MergerAccounts
