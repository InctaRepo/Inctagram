import React from 'react'

import { StatisticsDynamic } from '@/features/statistics'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const StatisticsPage = () => <StatisticsDynamic />

StatisticsPage.getLayout = GetAuthLayout
export default StatisticsPage
