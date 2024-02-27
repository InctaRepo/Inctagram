import React from 'react'

import { StatisticsDynamic } from '@/features/statistics'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const StatisticsPage: NextPageWithLayout = () => <StatisticsDynamic />

StatisticsPage.getLayout = getAuthLayout
export default StatisticsPage
