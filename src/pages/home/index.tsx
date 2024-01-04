import React from 'react'

import { HomeDynamic } from '@/src/features/home'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { getPublicLayout } from '@/src/widgets/layout/authLayout'

const HomePage: NextPageWithLayout = () => {
  return <HomeDynamic />
}

HomePage.getLayout = getPublicLayout
export default HomePage
