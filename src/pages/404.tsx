import React from 'react'

import { Page404Dynamic } from '@/features/page404'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const Custom404 = () => <Page404Dynamic />

Custom404.getLayout = GetAuthLayout
export default Custom404
