import React from 'react'

import { Page404Dynamic } from '@/features/page404'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const Custom404: NextPageWithLayout = () => <Page404Dynamic />

Custom404.getLayout = getAuthLayout
export default Custom404
