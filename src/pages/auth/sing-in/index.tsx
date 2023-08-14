import { LoginForm } from '@/src/components/auth/login-form/login-form'
import { NextPageWithLayout } from '@/src/pages/_app'

const SignInPage: NextPageWithLayout = () => {
  return (
    <>
      {/*@ts-ignore*/}
      <LoginForm />
    </>
    //TODO linkpath to sign in
  )
}

export default SignInPage
