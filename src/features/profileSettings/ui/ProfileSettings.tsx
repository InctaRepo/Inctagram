import React from 'react'

import { DevicesDynamic } from '@/src/entities/profile/settings/devices'
import { GeneralInformationDynamic } from '@/src/entities/profile/settings/generalInformation'
import s from '@/src/features/profileSettings/ui/profileSettings.module.scss'
import { useTranslate } from '@/src/shared/hooks'
import { Sidebar } from '@/src/shared/sidebar'
import { TabsComponent } from '@/src/shared/ui/tabsComponent'

export const ProfileSettings = () => {
  // const { push } = useRouter()
  // const [updateProfile, { isSuccess: isSuccessUpdate, isLoading: isLoadingUpdate }] =
  //   useUpdateProfileMutation()
  // const [createProfile, { isSuccess: isSuccessCreate, isLoading: isLoadingCreate }] =
  //   useCreateProfileMutation()
  // const userId = useAppSelector(getUserId)
  // const userName = useAppSelector(getUsername)
  // const { data: profile, isLoading } = useGetProfileQuery(userId)
  // const [uploadAvatar, { isSuccess: isSuccessAvatar, isLoading: isLoadingAva }] =
  //   useUploadAvatarMutation()
  // const editorRef = useRef<AvatarEditor>(null)
  // const [croppedAvatar, setCroppedAvatar] = useState<string | null>(null)
  // const [isModalOpen, setIsModalOpen] = useState(false)
  // const [selectedImage, setSelectedImage] = useState<File | null>(null)
  // const successRes =
  //   (isSuccessCreate && profile?.resultCode === 0) || (isSuccessUpdate && profile?.resultCode === 0)
  // const [avatar, setAvatar] = useState<FormData | null>(null)
  const { t } = useTranslate()
  // const handleSavePhoto = () => {
  //   if (editorRef.current) {
  //     const canvas = editorRef.current.getImageScaledToCanvas()
  //
  //     canvas.toBlob(blob => {
  //       if (blob) {
  //         const file = new File([blob], 'avatar', { type: blob.type })
  //         const formData = new FormData()
  //
  //         formData.append('file', file)
  //         convertFileToBase64(file, (file64: string) => {
  //           setCroppedAvatar(file64)
  //         })
  //         setAvatar(formData)
  //         setIsModalOpen(false)
  //         setSelectedImage(null)
  //       }
  //     })
  //   }
  // }

  // const submit = (data: ProfileSettingSchema) => {
  //   profile?.data
  //     ? updateProfile({
  //         userId: userId,
  //         username: data.username,
  //         firstName: data.firstName,
  //         lastName: data.lastName,
  //         country: data.country,
  //         city: data.city,
  //         dateOfBirth: data.dateOfBirthday,
  //         aboutMe: data.aboutMe,
  //         avatar: data.avatar,
  //       })
  //         .then(() => {
  //           if (avatar !== null) {
  //             uploadAvatar(avatar!)
  //           }
  //         })
  //         .then(() => {
  //           setIsModalOpen(false)
  //           setSelectedImage(null)
  //         })
  //     : createProfile({
  //         userId: userId,
  //         username: data.username,
  //         firstName: data.firstName,
  //         lastName: data.lastName,
  //         country: data.country,
  //         city: data.city,
  //         dateOfBirth: data.dateOfBirthday,
  //         aboutMe: data.aboutMe,
  //         avatar: data.avatar,
  //       })
  //         .then(() => {
  //           if (avatar !== null) {
  //             uploadAvatar(avatar!)
  //           }
  //         })
  //         .then(() => {
  //           setIsModalOpen(false)
  //           setSelectedImage(null)
  //         })
  // }

  // const setToastHandler = () => {
  //   if (successRes) {
  //     useErrorToast(true, false, true)
  //   }
  // }
  //
  // useEffect(() => {
  //   if ((isSuccessCreate || isSuccessUpdate) && (avatar === null || isSuccessAvatar)) {
  //     setToastHandler()
  //     push(RouteNames.PROFILE + '/' + userId)
  //   }
  // }, [isSuccessCreate, isSuccessUpdate, isSuccessAvatar, avatar])

  // if (isLoadingAva || isLoading || isLoadingCreate || isLoadingUpdate) return <Loader />
  // if ((isSuccessCreate || isSuccessUpdate) && (avatar === null || isSuccessAvatar))
  //   return <Loader />

  return (
    <div className={s.container}>
      <Sidebar />
      <div className={s.containerInfo}>
        <div className={s.tabsMenu}>
          <TabsComponent
            tabs={[
              {
                label: `${t.profile.profileSetting.generalInformation}`,
                value: 'settings',
                children: (
                  <GeneralInformationDynamic
                  // isModalOpen={isModalOpen}
                  // setIsModalOpen={setIsModalOpen}
                  // selectedImage={selectedImage}
                  // setSelectedImage={setSelectedImage}
                  // editorRef={editorRef}
                  // handleSavePhoto={handleSavePhoto}
                  // onSubmitHandler={submit}
                  // userData={profile?.data}
                  // userNameFromMe={userName}
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
    </div>
  )
}
