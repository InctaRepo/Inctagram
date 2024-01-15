import React from 'react'

import AvatarEditor from 'react-avatar-editor'

import { UserInfo } from '@/src/entities/profile/service'
import { DevicesDynamic } from '@/src/entities/profile/settings/devices'
import { GeneralInformationDynamic } from '@/src/entities/profile/settings/generalInformation'
import s from '@/src/features/profileSettings/settings/ui/settings.module.scss'
import { useTranslate } from '@/src/shared/hooks'
import { ProfileSettingSchema } from '@/src/shared/schemas/profileSettingSchema'
import { TabsComponent } from '@/src/shared/ui/tabsComponent'

type Props = {
  onSubmitHandler: (data: ProfileSettingSchema) => void
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  selectedImage: File | null
  setSelectedImage: (selectedImage: File | null) => void
  editorRef: React.RefObject<AvatarEditor>
  handleSavePhoto: () => void
  croppedAvatar: string | null
  setCroppedAvatar: (croppedAvatar: string | null) => void
  userData?: UserInfo
  userNameFromMe: string | undefined
}
export const Settings = ({
  croppedAvatar,
  setCroppedAvatar,
  isModalOpen,
  setIsModalOpen,
  selectedImage,
  setSelectedImage,
  editorRef,
  handleSavePhoto,
  onSubmitHandler,
  userData,
  userNameFromMe,
}: Props) => {
  const { t } = useTranslate()

  return (
    <div className={s.profile}>
      <div className={s.tabsMenu}>
        <TabsComponent
          tabs={[
            {
              label: `${t.profile.profileSetting.generalInformation}`,
              value: 'settings',
              children: (
                <GeneralInformationDynamic
                  croppedAvatar={croppedAvatar}
                  setCroppedAvatar={setCroppedAvatar}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  editorRef={editorRef}
                  handleSavePhoto={handleSavePhoto}
                  onSubmitHandler={onSubmitHandler}
                  userData={userData}
                  userNameFromMe={userNameFromMe}
                />
              ),
            },
            {
              label: `${t.profile.profileSetting.devices}`,
              value: 'devices',
              children: <DevicesDynamic />,
            },
            {
              label: `${t.profile.profileSetting.accountManagement}`,
              value: 'account-management',
            },
            { label: `${t.profile.profileSetting.myPayment}`, value: 'my-payment' },
          ]}
        />
      </div>
    </div>
  )
}
