import React from 'react'
import { getProfileLayout } from 'src/widgets/layout/profileLayout'
import { Page404 } from 'src/features/page404'
import { NextPageWithLayout } from '@/src/shared/service/types'

const Custom404: NextPageWithLayout = () => {
  return <Page404 />
}

Custom404.getLayout = getProfileLayout
export default Custom404
