import React from 'react'

import { CreateNewPasswordDynamic } from '@/features/auth/createNewPassword'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const CreateNewPasswordPage = () => <CreateNewPasswordDynamic />

CreateNewPasswordPage.getLayout = GetAuthLayout
export default CreateNewPasswordPage
