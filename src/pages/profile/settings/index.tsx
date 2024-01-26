import React from 'react'

import { ProfileSettingsDynamic } from '@/features/profileSettings'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const SettingsPage: NextPageWithLayout = () => {
  return <ProfileSettingsDynamic />
}

SettingsPage.getLayout = getAuthLayout
export default SettingsPage
