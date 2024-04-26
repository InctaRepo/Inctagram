import { useMemo } from 'react'

import { getProfile, getRunningQueriesThunk } from '@/entities/profile/service'
import { getUserPosts } from '@/features/posts'
import { Profile } from '@/features/profile'
import { wrapper } from '@/store'
import { GetAuthLayout } from '@/widgets/layout/authLayout'
import { useRouter } from 'next/router'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const id = context.query?.id as string

  store.dispatch(getProfile.initiate(id, { forceRefetch: true }))
  store.dispatch(getUserPosts.initiate({ userId: id }, { forceRefetch: true }))
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const MyProfilePage = () => {
  const router = useRouter()
  const id = useMemo(() => {
    return router.query.id as string
  }, [router.query.id])

  return <Profile id={id} />
}

MyProfilePage.getLayout = GetAuthLayout
export default MyProfilePage
