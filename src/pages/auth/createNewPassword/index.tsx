import React from 'react'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'
import { CreateNewPassword } from '@/src/features/auth/createNewPassword/ui/CreateNewPassword'

const CreateNewPasswordPage = () => {
  return <CreateNewPassword />
}

CreateNewPasswordPage.getLayout = getAuthLayout
export default CreateNewPasswordPage
