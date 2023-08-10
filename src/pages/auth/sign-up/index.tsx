import { RegisterForm, RegisterFormType } from '@/src/components/auth/register-form'
import { getAuthLayout } from '@/src/components/Layout/AuthLayout/AuthLayout'
import { NextPageWithLayout } from '@/src/pages/_app'

const SignUpPage: NextPageWithLayout = () => {
  const submit = (data: RegisterFormType) => {
    // register(data)
  }

  return (
    <>
      <RegisterForm onSubmitHandler={submit} />
    </>
    //TODO linkpath to sign in
  )
}

SignUpPage.getLayout = getAuthLayout
export default SignUpPage
