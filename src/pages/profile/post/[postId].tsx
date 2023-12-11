import { useRouter } from 'next/dist/client/router'
import { wrapper } from '@/src/store/wrapper'
import { getPublicProfileLayout } from '@/src/widgets/layout/publicProfileLayout/PublicProfileLayout'
import { getRunningQueriesThunk, getUserPost } from '@/src/features/posts'
import { EditPostModal } from '@/src/features/posts/editDeletePost/EditPostModal'
import { NextPageWithLayout } from '@/src/shared/service/types'

//http://localhost:3000/profile/8cb70a2e-84d7-4a4b-a17a-00532fe03b75/post/d8829eb8-b950-4eaf-8b17-ccafb35bc77c
export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query, params }) => {
  console.log(store, 'preach')
  console.log(query, 'xdo')
  console.log(params, 'miki')
  // @ts-ignore
  const postId = query.id || params.id

  console.log(postId, 'ewe')

  if (typeof postId === 'string') store.dispatch(getUserPost.initiate(postId))
  !(await Promise.all(store.dispatch(getRunningQueriesThunk())))

  // if (typeof id === 'string')
  //   store.dispatch(getUserPost.initiate('6ec102f6-8df9-4b71-bd83-f90e16b396d6'))
  // !(await Promise.all(store.dispatch(getRunningQueriesThunk())))

  return {
    props: {},
  }
})

const MyProfilePage: NextPageWithLayout = () => {
  const router = useRouter()
  const id = router.query.id

  return <EditPostModal variant="single post" />
}

MyProfilePage.getLayout = getPublicProfileLayout
export default MyProfilePage
