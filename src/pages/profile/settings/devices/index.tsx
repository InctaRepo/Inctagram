import React from 'react'

import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const DevicesPage: NextPageWithLayout = () => {
  return <div>DevicesPage</div>
}

DevicesPage.getLayout = getAuthLayout
export default DevicesPage
