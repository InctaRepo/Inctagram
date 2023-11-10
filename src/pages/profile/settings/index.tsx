import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'
import AvatarEditor from 'react-avatar-editor'

import { useErrorToast } from '@/src/assets/hooks/use-error-toast'
import { RouteNames } from '@/src/common/constants/route-names'
import { ProfileSettingFormType } from '@/src/common/schemas/profile-setting-schema'
import { MenuContainer } from '@/src/components/profile/menu-container'
import { ProfileSettings } from '@/src/components/profile/profile-settings/Profile-settings'
import s from '@/src/components/profile/profile.module.scss'
import { useAppSelector } from '@/src/services'
import { useGetMeQuery } from '@/src/services/auth'
import { authIsAuthSelector } from '@/src/services/auth/auth-selectors'
import {
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useGetProfileQuery,
} from '@/src/services/profile/profile-api'
import { ProfileLayout } from 'src/components/layout/profile-layout'

const ProfileSettnigs = () => {
  const isAuth = useAppSelector(authIsAuthSelector)

  const router = useRouter()
  const [updateProfile, { isSuccess: isSuccessUpdate }] = useUpdateProfileMutation()
  const [createProfile, { isSuccess }] = useCreateProfileMutation()
  const { data: user } = useGetMeQuery()
  const id = user?.data?.userId
  const userNameFromMe = user?.data?.username
  const { data: profile } = useGetProfileQuery(id)
  const [uploadAvatar] = useUploadAvatarMutation()

  const editorRef = useRef<AvatarEditor>(null)
  const [avatar, setAvatar] = useState<FormData | null>(null)
  const [croppedAvatar, setCroppedAvatar] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const { data } = useGetProfileQuery(id!)
  const successRes =
    (isSuccess && data?.resultCode === 0) || (isSuccessUpdate && data?.resultCode === 0)

  const handleSavePhoto = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas()

      canvas.toBlob(blob => {
        if (blob) {
          const file = new File([blob], 'avatar', { type: blob.type })
          const formData = new FormData()

          formData.append('file', file)
          convertFileToBase64(file, (file64: string) => {
            setCroppedAvatar(file64)
          })
          setAvatar(formData)

          setIsModalOpen(false)
          setSelectedImage(null)
        }
      })
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  const submit = (data: ProfileSettingFormType) => {
    profile?.data
      ? updateProfile({
          id: id, //id was taken from the line 29
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.country,
          city: data.city,
          dateOfBirth: data.dateOfBirthday,
          aboutMe: data.aboutMe,
          avatar: data.avatar,
        }).then(() => {
          uploadAvatar(avatar!)
            .unwrap()
            .then(() => {
              setIsModalOpen(false)
              setSelectedImage(null)
            })
          /*  .then(() => {
              router.push(RouteNames.MY_PROFILE)
            })*/
        })
      : createProfile({
          id: id,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.country,
          city: data.city,
          dateOfBirth: data.dateOfBirthday,
          aboutMe: data.aboutMe,
          avatar: data.avatar,
        }).then(() => {
          uploadAvatar(avatar!)
            .unwrap()
            .then(() => {
              setIsModalOpen(false)
              setSelectedImage(null)
            })
          /*.then(() => {
              router.push(RouteNames.MY_PROFILE)
            })*/
        })
  }

  const setToastHandler = () => {
    if (successRes) {
      useErrorToast(true, false, true)
    }
  }

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  useEffect(() => {
    if (isSuccess || isSuccessUpdate) {
      setToastHandler()
    }
  }, [isSuccess, isSuccessUpdate])

  return (
    <ProfileLayout>
      <div className={s.container}>
        <MenuContainer />
        <div className={s.containerInfo}>
          <ProfileSettings
            userNameFromMe={userNameFromMe}
            userData={data?.data}
            onSubmitHandler={submit}
            croppedAvatar={croppedAvatar}
            setCroppedAvatar={setCroppedAvatar}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            editorRef={editorRef}
            handleSavePhoto={handleSavePhoto}
          />
        </div>
      </div>
    </ProfileLayout>
  )
}

export default ProfileSettnigs
