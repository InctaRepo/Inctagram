import React from 'react'

import { Page404 } from '@/src/components/404'
import { getProfileLayout } from '@/src/components/layout/profile-layout'
import { NextPageWithLayout } from '@/src/pages/_app'

const Custom404: NextPageWithLayout = () => {
  return <Page404 />
}

Custom404.getLayout = getProfileLayout
export default Custom404
