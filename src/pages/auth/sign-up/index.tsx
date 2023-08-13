import { useMutation } from 'react-query'

import { authAPI } from '@/src/assets/api'
import { RegisterForm, RegisterFormType } from '@/src/components/auth/register-form'
import { getAuthLayout } from '@/src/components/Layout/AuthLayout/AuthLayout'
import { NextPageWithLayout } from '@/src/pages/_app'

const SignUpPage: NextPageWithLayout = () => {
  const {
    mutate: userRegistration,
    data,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: authAPI.createUser,
  })

  const submit = (data: RegisterFormType) => {
    userRegistration(data)
  }

  return <RegisterForm onSubmitHandler={submit} />
}

SignUpPage.getLayout = getAuthLayout
export default SignUpPage
