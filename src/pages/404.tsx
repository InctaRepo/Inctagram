import React from 'react'

import { Page404Dynamic } from '@/src/features/page404'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const Custom404: NextPageWithLayout = () => {
  return <Page404Dynamic />
}

Custom404.getLayout = getAuthLayout
export default Custom404
