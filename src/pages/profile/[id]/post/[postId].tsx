import { useMemo } from 'react'

import { getProfile } from '@/entities/profile/service'
import { getRunningQueriesThunk, getUserPost, getUserPosts } from '@/features/posts'
import { Profile } from '@/features/profile'
import { wrapper } from '@/store'
import { GetAuthLayout } from '@/widgets/layout/authLayout'
import { useRouter } from 'next/router'

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

const MyPostPage = () => {
  const router = useRouter()
  const id = useMemo(() => {
    return router.query.id as string
  }, [router.query.id])
  const postId = useMemo(() => {
    return router.query.postId as string
  }, [router.query.postId])

  return <Profile id={id} postId={postId} />
}

MyPostPage.getLayout = GetAuthLayout
export default MyPostPage
