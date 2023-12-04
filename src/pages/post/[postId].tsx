import { useRouter } from 'next/dist/client/router'
import { wrapper } from '@/src/store/wrapper'
import { getPublicProfileLayout } from '@/src/widgets/layout/publicProfileLayout/PublicProfileLayout'
import { getUserPost, getRunningQueriesThunk } from '@/src/features/posts'
import { EditPostModal } from '@/src/features/posts/editDeletePost/EditPostModal'
import { NextPageWithLayout } from '@/src/shared/service/types'

//http://localhost:3000/post/6ec102f6-8df9-4b71-bd83-f90e16b396d6
export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const id = context.query?.id

  /*if (typeof id === 'string') {*/
  store.dispatch(getUserPost.initiate('6ec102f6-8df9-4b71-bd83-f90e16b396d6'))
  /*}*/
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const MyProfilePage: NextPageWithLayout = () => {
  const router = useRouter()
  const id = router.query.id

  return <EditPostModal />
}

MyProfilePage.getLayout = getPublicProfileLayout
export default MyProfilePage
