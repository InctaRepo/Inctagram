import React from 'react'

import { HomeDynamic } from '@/features/home'
import { getAllPosts, getRunningQueriesThunk, getUsersCount } from '@/features/posts'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { wrapper } from '@/store'
import { getAuthLayout } from '@/widgets/layout/authLayout'

export const getStaticProps = wrapper.getStaticProps(store => async context => {
  store.dispatch(getAllPosts.initiate({}, { subscriptionOptions: { pollingInterval: 60 } }))
  store.dispatch(getUsersCount.initiate(void { subscriptionOptions: { pollingInterval: 60 } }))
  await Promise.all(store.dispatch(getRunningQueriesThunk()))
  // const { data: postData, isLoading, isError } = useGetAllPostsQuery({})

  return {
    props: {
      // postData
    },
  }
})
const HomePage: NextPageWithLayout = () => {
  return <HomeDynamic />
}

HomePage.getLayout = getAuthLayout
export default HomePage
