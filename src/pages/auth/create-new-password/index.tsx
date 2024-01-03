import React from 'react'

import { CreateNewPasswordDynamic } from '@/src/features/auth/createNewPassword'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const CreateNewPasswordPage = () => {
  return <CreateNewPasswordDynamic />
}

CreateNewPasswordPage.getLayout = getAuthLayout
export default CreateNewPasswordPage
