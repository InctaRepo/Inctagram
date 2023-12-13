import { useRouter } from 'next/dist/client/router'

import { getUserPosts } from '@/src/features/posts'
import { Profile } from '@/src/features/profile'
import { getProfile, getRunningQueriesThunk } from '@/src/features/profile/service'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { wrapper } from '@/src/store/wrapper'
import { getPublicLayout } from '@/src/widgets/layout/publicLayout'
//http://localhost:3000/profile/d8d525f5-8d47-46f2-8b27-d7488ea9e40e i need it for testing queries
export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const id = context.query?.id as string

  store.dispatch(getProfile.initiate(id))
  store.dispatch(getUserPosts.initiate(id))
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const MyProfilePage: NextPageWithLayout = () => {
  const router = useRouter()
  const id = router.query.id as string

  return <Profile id={id} />
}

MyProfilePage.getLayout = getPublicLayout
export default MyProfilePage
