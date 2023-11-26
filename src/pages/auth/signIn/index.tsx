import { getAuthLayout } from 'src/widgets/layout/authLayout'
import { SignIn } from '@/src/features/auth/signIn/ui/SignIn'

const SignInPage = () => {
  return <SignIn />
}

SignInPage.getLayout = getAuthLayout
export default SignInPage
