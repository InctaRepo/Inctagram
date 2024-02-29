// eslint-disable-next-line @conarti/feature-sliced/public-api
import React from 'react'

import { getAllPosts, getRunningQueriesThunk, getUsersCount } from '@/features/posts'
import { PublicPage } from '@/features/publicPage'
import { wrapper } from '@/store'
import { getAuthLayout } from '@/widgets/layout/authLayout'

export const getStaticProps = wrapper.getStaticProps(store => {
  return async context => {
    store.dispatch(getAllPosts.initiate({}, { subscriptionOptions: { pollingInterval: 300 } }))
    store.dispatch(getUsersCount.initiate(void { subscriptionOptions: { pollingInterval: 300 } }))
    store.dispatch(getAllPosts.initiate({}, { forceRefetch: true }))
    store.dispatch(getUsersCount.initiate(void { forceRefetch: true }))
    await Promise.all(store.dispatch(getRunningQueriesThunk()))

    return {
      props: {},
    }
  }
})
const Public = () => {
  return <PublicPage />
}

Public.getLayout = getAuthLayout
export default Public
