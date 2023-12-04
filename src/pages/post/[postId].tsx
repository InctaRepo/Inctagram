import { useRouter } from 'next/router'
import { wrapper } from '@/src/store/wrapper'
import { getUserPost, getRunningQueriesThunk } from '@/src/features/posts'
import { EditPostModal } from '@/src/features/posts/editDeletePost/EditPostModal'
// import {useRouter} from "next/dist/client/router";

export const getServerSideProps = wrapper.getServerSideProps(
  (store: any) => async (context: any) => {
    const id = context.query?.id

    if (typeof id === 'string') {
      store.dispatch(getUserPost.initiate(id))
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()))

    return {
      props: {},
    }
  }
)

const MyPost = () => {
  const router = useRouter()
  const id = router.query.id

  // @ts-ignore
  return <EditPostModal id={id} />
  //import editM... id={id}
  // return <Profile post={post} />
}

//http://localhost:3000/post/1f1a86b9-b4c5-4772-b7b7-ada137b973ef
export default getServerSideProps
