import { LogInform } from '@/src/components/auth/login-form/LogIn-form'
import { NextPageWithLayout } from '@/src/pages/_app'

const SingInPage: NextPageWithLayout = () => {
  return (
    <>
      {/*@ts-ignore*/}
      <LogInform />
    </>
    //TODO linkpath to sign in
  )
}

export default SingInPage
