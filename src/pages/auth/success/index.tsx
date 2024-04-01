import { SuccessGoogleGitHubDynamic } from '@/features/auth/successGoogleGitHub'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const SuccessPage = () => <SuccessGoogleGitHubDynamic />

SuccessPage.getLayout = GetAuthLayout
export default SuccessPage
