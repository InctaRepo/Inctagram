// eslint-disable-next-line @conarti/feature-sliced/public-api
import React from 'react'

import { useRouter } from 'next/router'

import { getStorageId } from '@/features/auth/signIn'
import { getAllPosts, getRunningQueriesThunk, getUsersCount } from '@/features/posts'
import { PublicPage } from '@/features/publicPage'
import { RouteNames } from '@/shared/const'
import { getIsAuth } from '@/shared/hoc'
import { useAppSelector } from '@/shared/hooks'
import { wrapper } from '@/store'
import { getAuthLayout } from '@/widgets/layout/authLayout'

export const getStaticProps = wrapper.getStaticProps(store => {
  return async context => {
    store.dispatch(getAllPosts.initiate({}, { subscriptionOptions: { pollingInterval: 60 } }))
    store.dispatch(getUsersCount.initiate(void { subscriptionOptions: { pollingInterval: 60 } }))
    store.dispatch(getAllPosts.initiate({}, { forceRefetch: true }))
    store.dispatch(getUsersCount.initiate(void { forceRefetch: true }))
    await Promise.all(store.dispatch(getRunningQueriesThunk()))

    return {
      props: {},
    }
  }
})
const Public = () => {
  const isAuth = useAppSelector(getIsAuth)
  const userId = useAppSelector(getStorageId) as string
  const router = useRouter()

  console.log('userId:', userId)
  if (isAuth && userId !== null) {
    router.push(RouteNames.PROFILE + '/' + userId)
  } else {
    return <PublicPage />
  }
}

Public.getLayout = getAuthLayout
export default Public
