import { InvalidLinkVerificationDynamic } from '@/features/auth/invalidLinkVerification'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const InvalidLinkVerificationPage = () => <InvalidLinkVerificationDynamic />

InvalidLinkVerificationPage.getLayout = getAuthLayout
export default InvalidLinkVerificationPage
