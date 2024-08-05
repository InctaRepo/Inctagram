import { RegistrationConfirmationDynamic } from '@/features/auth/registrationConfirmation'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const SignInPage = () => <RegistrationConfirmationDynamic />

SignInPage.getLayout = GetAuthLayout
export default SignInPage
