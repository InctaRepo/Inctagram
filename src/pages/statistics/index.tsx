import React from 'react'

import { StatisticsDynamic } from '@/src/features/statistics'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const StatisticsPage: NextPageWithLayout = () => {
  return <StatisticsDynamic />
}

StatisticsPage.getLayout = getAuthLayout
export default StatisticsPage
