import React from 'react'

import { AccountManagementDynamic } from '@/src/entities/profile/settings/accountManagement'
import { DevicesDynamic } from '@/src/entities/profile/settings/devices'
import { GeneralInformationDynamic } from '@/src/entities/profile/settings/generalInformation'
import { MyPaymentDynamic } from '@/src/entities/profile/settings/myPayment'
import s from '@/src/features/profileSettings/ui/profileSettings.module.scss'
import { useTranslate } from '@/src/shared/hooks'
import { Sidebar } from '@/src/shared/sidebar'
import { TabsComponent } from '@/src/shared/ui/tabsComponent'

export const ProfileSettings = () => {
  const { t } = useTranslate()

  return (
    <div className={s.container}>
      <Sidebar />
      <div className={s.containerInfo}>
        <div className={s.tabsMenu}>
          <TabsComponent
            tabs={[
              {
                label: `${t.profileSetting.setting.generalInformation}`,
                value: 'settings',
                children: <GeneralInformationDynamic />,
              },
              {
                label: `${t.profileSetting.setting.devices}`,
                value: 'devices',
                children: <DevicesDynamic />,
              },
              {
                label: `${t.profileSetting.setting.accountManagement}`,
                value: 'account-management',
                children: <AccountManagementDynamic />,
              },
              {
                label: `${t.profileSetting.setting.myPayment}`,
                value: 'my-payment',
                children: <MyPaymentDynamic />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
