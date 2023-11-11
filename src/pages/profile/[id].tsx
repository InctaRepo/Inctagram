import { getProfileLayout } from '@/src/components/layout/profile-layout'
import { Profile } from '@/src/components/profile'
import { NextPageWithLayout } from '@/src/pages/_app'
import { wrapper } from '@/src/services'
import { getProfileSSR, getRunningQueriesThunk } from '@/src/services/profile/profile-ssr-api'

//http://localhost:3000/profile/d8d525f5-8d47-46f2-8b27-d7488ea9e40e i need it for testing queries
export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const id = context.params?.id

  if (typeof id === 'string') {
    store.dispatch(getProfileSSR.initiate(id))
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const MyProfilePage: NextPageWithLayout = () => {
  return <Profile />
}

MyProfilePage.getLayout = getProfileLayout
export default MyProfilePage
