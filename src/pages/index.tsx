// eslint-disable-next-line @conarti/feature-sliced/public-api
import React from 'react'

import { getAllPosts, getRunningQueriesThunk, getUsersCount } from '@/features/posts'
import { PublicPageDynamic } from '@/features/publicPage'
import { wrapper } from '@/store'
import { getAuthLayout } from '@/widgets/layout/authLayout'

export const getStaticProps = wrapper.getStaticProps(store => async context => {
  store.dispatch(getAllPosts.initiate({}, { forceRefetch: 300 }))
  store.dispatch(getUsersCount.initiate(void { forceRefetch: 300 }))
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})
const PublicPage = () => <PublicPageDynamic />

PublicPage.getLayout = getAuthLayout
export default PublicPage
