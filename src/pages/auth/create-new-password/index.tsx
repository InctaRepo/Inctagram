import React from 'react'

import { CreateNewPasswordDynamic } from '@/features/auth/createNewPassword'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const CreateNewPasswordPage = () => <CreateNewPasswordDynamic />

CreateNewPasswordPage.getLayout = getAuthLayout
export default CreateNewPasswordPage
