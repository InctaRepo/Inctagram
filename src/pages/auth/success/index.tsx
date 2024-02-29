import { SuccessGoogleGitHubDynamic } from '@/features/auth/successGoogleGitHub'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const SuccessPage = () => <SuccessGoogleGitHubDynamic />

SuccessPage.getLayout = getAuthLayout
export default SuccessPage
