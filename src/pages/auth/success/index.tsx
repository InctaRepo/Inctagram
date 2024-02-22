import { SuccessGoogleGitHubDynamic } from '@/features/auth/successGoogleGitHub'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const SuccessPage = () => {
  return <SuccessGoogleGitHubDynamic />
}

SuccessPage.getLayout = getAuthLayout
export default SuccessPage
