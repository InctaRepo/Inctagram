import React from 'react'

import { ProfileSettingsDynamic } from '@/src/features/profileSettings'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const SettingsPage: NextPageWithLayout = () => {
  return <ProfileSettingsDynamic />
}

SettingsPage.getLayout = getAuthLayout
export default SettingsPage
