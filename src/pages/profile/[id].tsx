import { useRouter } from 'next/dist/client/router'

import { getUserPosts } from '@/src/features/posts'
import { Profile } from '@/src/features/profile'
import { getProfile, getRunningQueriesThunk } from '@/src/features/profile/service'
import { getUserId } from '@/src/shared/hoc'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { wrapper } from '@/src/store/wrapper'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

//http://localhost:3000/profile/10a07b79-1bd3-4438-b21d-3a1c17c24cbb i need it for testing queries
export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const id = context.query?.id as string

  store.dispatch(getProfile.initiate(id))
  store.dispatch(getUserPosts.initiate({ userId: id }))
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const MyProfilePage: NextPageWithLayout = () => {
  const router = useRouter()
  const id = router.query.id as string
  const userId = useAppSelector(getUserId)

  if (!userId) {
    return <Profile id={id} />
  }
  if (userId) {
    return <Profile id={userId} />
  }
}

MyProfilePage.getLayout = getAuthLayout
export default MyProfilePage
