import React from 'react'

import { HomeDynamic } from '@/features/home'
import { getAllPosts, getRunningQueriesThunk, getUsersCount } from '@/features/posts'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { wrapper } from '@/store'
import { getAuthLayout } from '@/widgets/layout/authLayout'

export const getStaticProps = wrapper.getStaticProps(store => async context => {
  store.dispatch(getAllPosts.initiate({}, { forceRefetch: true }))
  store.dispatch(getUsersCount.initiate(void { forceRefetch: true }))
  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
    revalidate: 60,
  }
})
const HomePage: NextPageWithLayout = () => {
  return <HomeDynamic />
}

HomePage.getLayout = getAuthLayout
export default HomePage
