import React from 'react'

import { ProfileSettingsDynamic } from '@/features/profileSettings'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const SettingsPage = () => {
  return <ProfileSettingsDynamic />
}

SettingsPage.getLayout = GetAuthLayout
export default SettingsPage
