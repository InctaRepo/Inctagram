import { InvalidLinkVerification } from '@/src/features/auth/invalidLinkVerification'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const InvalidLinkVerificationPage = () => {
  return <InvalidLinkVerification />
}

InvalidLinkVerificationPage.getLayout = getAuthLayout
export default InvalidLinkVerificationPage
