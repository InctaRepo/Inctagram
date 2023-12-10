import { useRouter } from 'next/dist/client/router'

import { ShowPostModal } from '@/src/entities/post/showPostModal/ShowPostModal'
import { getRunningQueriesThunk, getUserPost } from '@/src/features/posts'
//TODO EditPostModal
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { wrapper } from '@/src/store'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

//http://localhost:3000/post/6ec102f6-8df9-4b71-bd83-f90e16b396d6
export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const id = context.query?.id as string

  store.dispatch(getUserPost.initiate(id))
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const MyProfilePage: NextPageWithLayout = () => {
  const router = useRouter()
  const id = router.query.id as string

  return <ShowPostModal variant="single post" id={id} />
}

MyProfilePage.getLayout = getAuthLayout
export default MyProfilePage
