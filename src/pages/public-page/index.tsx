import React from 'react'

import { InferGetStaticPropsType } from 'next'

import { HomeDynamic } from '@/features/home'
import { getAllPosts, getRunningQueriesThunk, getUsersCount } from '@/features/posts'
import { wrapper } from '@/store'
import { getAuthLayout } from '@/widgets/layout/authLayout'

export const getStaticProps = wrapper.getStaticProps(store => async context => {
  store.dispatch(getAllPosts.initiate({}, { forceRefetch: 60 }))
  store.dispatch(getUsersCount.initiate(void { forceRefetch: 60 }))
  const data = await Promise.all(store.dispatch(getRunningQueriesThunk()))

  // const { data: postData, isLoading, isError } = useGetAllPostsQuery({})
  console.log(data, 'data')

  return {
    props: {
      data,
    },
    revalidate: 60,
  }
})
const PublicPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // @ts-ignore
  console.log(data[0]?.data?.data.totalCount, 'data.totalCount')

  return <HomeDynamic />
}

PublicPage.getLayout = getAuthLayout
export default PublicPage
