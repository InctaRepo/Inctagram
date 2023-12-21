import { useRouter } from 'next/dist/client/router'

import { getRunningQueriesThunk, getUserPost, getUserPosts } from '@/src/features/posts'
import { Profile } from '@/src/features/profile'
import { getProfile } from '@/src/features/profile/service'
import { getUserId } from '@/src/shared/hoc'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { wrapper } from '@/src/store'
import { getPublicLayout } from '@/src/widgets/layout/authLayout'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const postId = context.query?.postId as string

  const id = context.query?.id as string

  store.dispatch(getUserPost.initiate(postId))
  store.dispatch(getProfile.initiate(id))
  store.dispatch(getUserPosts.initiate({ userId: id }))
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const MyPostPage: NextPageWithLayout = () => {
  const router = useRouter()
  const id = router.query.id as string
  const postId = router.query.postId as string
  const userId = useAppSelector(getUserId)

  if (!userId) {
    return <Profile id={id} variant="single post" postId={postId} />
  }
  if (userId) {
    return <Profile id={userId} />
  }
}

MyPostPage.getLayout = getPublicLayout
export default MyPostPage
