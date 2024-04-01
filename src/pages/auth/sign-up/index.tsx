import { SignUpDynamic } from '@/features/auth/signUp'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const SignUpPage = () => <SignUpDynamic />

SignUpPage.getLayout = GetAuthLayout
export default SignUpPage
