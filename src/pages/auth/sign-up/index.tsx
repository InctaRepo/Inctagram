import { SignUpDynamic } from '@/features/auth/signUp'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const SignUpPage = () => <SignUpDynamic />

SignUpPage.getLayout = getAuthLayout
export default SignUpPage
