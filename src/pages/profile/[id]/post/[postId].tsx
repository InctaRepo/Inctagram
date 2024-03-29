import { useRouter } from 'next/dist/client/router'

import { getProfile } from '@/entities/profile/service'
import { getRunningQueriesThunk, getUserPost, getUserPosts } from '@/features/posts'
import { Profile } from '@/features/profile'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { wrapper } from '@/store'
import { getAuthLayout } from '@/widgets/layout/authLayout'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const postId = context.query?.postId as string

  const id = context.query?.id as string

  store.dispatch(getUserPost.initiate(postId, { forceRefetch: true }))
  store.dispatch(getProfile.initiate(id, { forceRefetch: true }))
  store.dispatch(getUserPosts.initiate({ userId: id }, { forceRefetch: true }))
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const MyPostPage: NextPageWithLayout = () => {
  const router = useRouter()
  const id = router.query.id as string
  const postId = router.query.postId as string

  return <Profile id={id} postId={postId} />
}

MyPostPage.getLayout = getAuthLayout
export default MyPostPage
