import React from 'react'

import { HomeDynamic } from '@/features/home'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const HomePage = () => <HomeDynamic />

HomePage.getLayout = GetAuthLayout
export default HomePage
