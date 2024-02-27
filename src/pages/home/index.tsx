import React from 'react'

import { HomeDynamic } from '@/features/home'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const HomePage = () => <HomeDynamic />

HomePage.getLayout = getAuthLayout
export default HomePage
