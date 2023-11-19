import { getAuthLayout } from 'src/widgets/layout/authLayout'
import { InvalidLinkVerification } from '@/src/features/auth/invalidLinkVerification/InvalidLinkVerification'

const InvalidLinkVerificationPage = () => {
  return <InvalidLinkVerification />
}

InvalidLinkVerificationPage.getLayout = getAuthLayout
export default InvalidLinkVerificationPage
