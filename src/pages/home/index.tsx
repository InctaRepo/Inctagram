import React from 'react'

import { HomeDynamic } from '@/features/home'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { getPublicLayout } from '@/widgets/layout/authLayout'

const HomePage: NextPageWithLayout = () => {
  return <HomeDynamic />
}

HomePage.getLayout = getPublicLayout
export default HomePage
