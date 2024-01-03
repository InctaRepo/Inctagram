import { InvalidLinkVerificationDynamic } from '@/src/features/auth/invalidLinkVerification'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const InvalidLinkVerificationPage = () => {
  return <InvalidLinkVerificationDynamic />
}

InvalidLinkVerificationPage.getLayout = getAuthLayout
export default InvalidLinkVerificationPage
