import { getProfileLayout } from '@/src/components/layout/profile-layout'
import { Profile } from '@/src/components/profile'
import { NextPageWithLayout } from '@/src/pages/_app'
import { wrapper } from '@/src/services'
import { getProfileSSR, getRunningQueriesThunk } from '@/src/services/profile/profileSsrApi'

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
