import React from 'react'

import { ProfileSettingsDynamic } from '@/features/profileSettings'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const SettingsPage: NextPageWithLayout = () => {
  return <ProfileSettingsDynamic />
}

SettingsPage.getLayout = GetAuthLayout
export default SettingsPage
