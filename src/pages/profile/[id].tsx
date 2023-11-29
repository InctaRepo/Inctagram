import { useRouter } from 'next/dist/client/router'
import { wrapper } from '@/src/store/wrapper'
import { getPublicProfileLayout } from '@/src/widgets/layout/publicProfileLayout/PublicProfileLayout'
import { Profile } from '@/src/features/profile/profile'
import {
  getProfile,
  getRunningQueriesThunk,
  useGetProfileQuery,
} from '@/src/features/profile/service/profileApi'
import { NextPageWithLayout } from '@/src/shared/service/types'
//http://localhost:3000/profile/d8d525f5-8d47-46f2-8b27-d7488ea9e40e i need it for testing queries
export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const id = context.query?.id

  if (typeof id === 'string') {
    store.dispatch(getProfile.initiate(id))
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const MyProfilePage: NextPageWithLayout = () => {
  const router = useRouter()
  const id = router.query.id
  const { data } = useGetProfileQuery(
    id /*, {
    refetchOnMountOrArgChange: true,
    skip: false,
  }*/
  )

  console.log(data)

  return <Profile id={id} data={data} />
}

MyProfilePage.getLayout = getPublicProfileLayout
export default MyProfilePage
