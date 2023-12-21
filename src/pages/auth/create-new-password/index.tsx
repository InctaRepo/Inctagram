import React from 'react'

import { CreateNewPassword } from '@/src/features/auth/createNewPassword'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const CreateNewPasswordPage = () => {
  return <CreateNewPassword />
}

CreateNewPasswordPage.getLayout = getAuthLayout
export default CreateNewPasswordPage
