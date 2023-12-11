import { useRouter } from 'next/dist/client/router'

import { getRunningQueriesThunk, getUserPost, getUserPosts } from '@/src/features/posts'
//TODO EditPostModal
import { Profile } from '@/src/features/profile'
import { getProfile } from '@/src/features/profile/service'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { wrapper } from '@/src/store'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'
//http://localhost:3000/profile/post/98bd128d-56e1-49be-a201-7aecc4beb748

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const postId = context.query?.postId as string
  const id = context.query?.id as string

  console.log(context, postId, id, '22222222222222222222222')
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

MyPostPage.getLayout = getAuthLayout
export default MyPostPage
