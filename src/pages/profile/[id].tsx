import { useRouter } from 'next/dist/client/router'
import { wrapper } from '@/src/store/wrapper'
import { getPublicProfileLayout } from '@/src/widgets/layout/publicProfileLayout/PublicProfileLayout'
import { Profile } from '@/src/features/profile/profile'
import { getProfile, getRunningQueriesThunk } from '@/src/features/profile/service/profileApi'
import { NextPageWithLayout } from '@/src/shared/service/types'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const id = context.params?.id

  if (typeof id === 'string') {
    store.dispatch(getProfile.initiate(id))
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const MyProfilePage: NextPageWithLayout = () => {
  const router = useRouter()
  const id = router.query.id

  return <Profile id={id} />
}

MyProfilePage.getLayout = getPublicProfileLayout
export default MyProfilePage
