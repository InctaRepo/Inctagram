// eslint-disable-next-line @conarti/feature-sliced/public-api
import React from 'react'

import { getStorageId } from '@/features/auth/signIn'
import { getAllPosts, getRunningQueriesThunk, getUsersCount } from '@/features/posts'
import { PublicPage } from '@/features/publicPage'
import { RouteNames } from '@/shared/const'
import { getIsAuth } from '@/shared/hoc'
import { useAppSelector } from '@/shared/hooks'
import { wrapper } from '@/store'
import { GetAuthLayout } from '@/widgets/layout/authLayout'
import { useRouter } from 'next/router'

export const getStaticProps = wrapper.getStaticProps(store => {
  return async context => {
    store.dispatch(getAllPosts.initiate({}, { forceRefetch: 60 }))
    store.dispatch(getUsersCount.initiate(void { forceRefetch: 60 }))
    store.dispatch(getAllPosts.initiate({}, { forceRefetch: true }))
    store.dispatch(getUsersCount.initiate(void { forceRefetch: true }))
    await Promise.race(store.dispatch(getRunningQueriesThunk()))

    return {
      props: {},
    }
  }
})
const Public = () => {
  const isAuth = useAppSelector(getIsAuth)
  const userId = useAppSelector(getStorageId) as string
  const router = useRouter()

  if (isAuth && userId !== null) {
    router.push(RouteNames.PROFILE + '/' + userId)
  } else {
    return <PublicPage />
  }
}

Public.getLayout = GetAuthLayout
export default Public
