import { useRouter } from 'next/dist/client/router'

import { getRunningQueriesThunk, getUserPost, getUserPosts } from '@/src/features/posts'
import { Profile } from '@/src/features/profile'
import { getProfile } from '@/src/features/profile/service'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { wrapper } from '@/src/store'
import { getPublicLayout } from '@/src/widgets/layout/publicLayout'
//http://localhost:3000/profile/d8d525f5-8d47-46f2-8b27-d7488ea9e40e/post/f5fefcf3-0d41-49a0-9afe-babaf0342a4c

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const postId = context.query?.postId as string
  const id = context.query?.id as string

  store.dispatch(getUserPost.initiate(postId))
  store.dispatch(getProfile.initiate(id))
  store.dispatch(getUserPosts.initiate(id))
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const MyPostPage: NextPageWithLayout = () => {
  const router = useRouter()
  const id = router.query.id as string
  const postId = router.query.postId as string

  // return <ShowPostModal variant="single post" id={id} />
  return <Profile id={id} variant="single post" postId={postId} />
}

MyPostPage.getLayout = getPublicLayout
export default MyPostPage
