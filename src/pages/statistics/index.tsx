import React from 'react'

import { StatisticsDynamic } from '@/features/statistics'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const StatisticsPage: NextPageWithLayout = () => <StatisticsDynamic />

StatisticsPage.getLayout = GetAuthLayout
export default StatisticsPage
