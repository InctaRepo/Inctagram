import { SignUp } from '@/src/features/auth/signUp'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const SignUpPage = () => {
  return <SignUp />
}

SignUpPage.getLayout = getAuthLayout
export default SignUpPage
