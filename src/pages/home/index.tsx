import React from 'react'

import { HomeDynamic } from '@/features/home'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const HomePage: NextPageWithLayout = () => {
  return <HomeDynamic />
}

HomePage.getLayout = getAuthLayout
export default HomePage
