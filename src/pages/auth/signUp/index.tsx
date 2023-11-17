import { getAuthLayout } from 'src/widgets/layout/authLayout'
import { SignUp } from '@/src/features/auth/signUp/ui/SignUp'

const SignUpPage = () => {
  return <SignUp />
}

SignUpPage.getLayout = getAuthLayout
export default SignUpPage
