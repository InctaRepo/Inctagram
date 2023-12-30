import { SignInDynamic } from '@/src/features/auth/signIn'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const SignInPage = () => {
  return <SignInDynamic />
}

SignInPage.getLayout = getAuthLayout
export default SignInPage
