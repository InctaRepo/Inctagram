import { LogInForm } from '@/src/components/auth/login-form/logIn-form'
import { NextPageWithLayout } from '@/src/pages/_app'

const SingInPage: NextPageWithLayout = () => {
  return (
    <>
      {/*@ts-ignore*/}
      <LogInForm />
    </>
    //TODO linkpath to sign in
  )
}

export default SingInPage
