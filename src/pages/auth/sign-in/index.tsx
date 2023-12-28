import { SignIn } from '@/src/features/auth/signIn'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const SignInPage = () => {
  return <SignIn />
}

SignInPage.getLayout = getAuthLayout
export default SignInPage
