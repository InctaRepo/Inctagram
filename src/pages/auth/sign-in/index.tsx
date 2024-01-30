import { SignInDynamic } from '@/features/auth/signIn'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const SignInPage = () => {
  return <SignInDynamic />
}

SignInPage.getLayout = getAuthLayout
export default SignInPage
