// eslint-disable-next-line @conarti/feature-sliced/public-api
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const Home = () => {
  return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}></div>
}

Home.getLayout = getAuthLayout

export default Home
