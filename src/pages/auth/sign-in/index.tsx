import { SignInDynamic } from '@/features/auth/signIn'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const SignInPage = () => <SignInDynamic />

SignInPage.getLayout = GetAuthLayout
export default SignInPage
