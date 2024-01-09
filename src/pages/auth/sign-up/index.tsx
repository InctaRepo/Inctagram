import { SignUpDynamic } from '@/src/features/auth/signUp'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const SignUpPage = () => {
  return <SignUpDynamic />
}

SignUpPage.getLayout = getAuthLayout
export default SignUpPage
