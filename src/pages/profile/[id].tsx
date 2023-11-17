import { wrapper } from '@/src/store'
import { getProfileLayout } from 'src/widgets/layout/profileLayout'
import { Profile } from '@/src/features/profile'
import { getProfileSSR, getRunningQueriesThunk } from '@/src/features/profile/service/profileSsrApi'
import { NextPageWithLayout } from '@/src/shared/service/types'

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
