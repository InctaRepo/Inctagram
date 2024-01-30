import { useRouter } from 'next/dist/client/router'

import { getProfile, getRunningQueriesThunk } from '@/entities/profile/service'
import { getUserPosts } from '@/features/posts'
import { Profile } from '@/features/profile'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { wrapper } from '@/store'
import { getAuthLayout } from '@/widgets/layout/authLayout'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const id = context.query?.id as string

  store.dispatch(getProfile.initiate(id, { forceRefetch: true }))
  store.dispatch(getUserPosts.initiate({ userId: id }, { forceRefetch: true }))
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

MyProfilePage.getLayout = getAuthLayout
export default MyProfilePage
