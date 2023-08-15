import { getAuthLayout } from '@/src/components/Layout/AuthLayout/AuthLayout'
import { NextPageWithLayout } from '@/src/pages/_app'
import SignInPage from '@/src/pages/auth/sing-in'

const Home: NextPageWithLayout = () => <SignInPage />

Home.getLayout = getAuthLayout
export default Home
