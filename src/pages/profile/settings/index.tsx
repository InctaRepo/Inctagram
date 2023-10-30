import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'
import AvatarEditor from 'react-avatar-editor'

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
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from '@/src/services/profile/profile-api'
import { ProfileLayout } from 'src/components/layout/profile-layout'

const Index = () => {
  const isAuth = useAppSelector(authIsAuthSelector)

  const router = useRouter()
  const [updateProfile] = useUpdateProfileMutation()
  const [createProfile] = useCreateProfileMutation()
  const { data: user } = useGetMeQuery()
  const id = user?.data?.userId
  const userName = user?.data?.username
  const [uploadAvatar] = useUploadAvatarMutation()
  const editorRef = useRef<AvatarEditor>(null)
  const [avatar, setAvatar] = useState<FormData | null>(null)
  const [croppedAvatar, setCroppedAvatar] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const handleSavePhoto = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas()

      canvas.toBlob(blob => {
        if (blob) {
          setCroppedAvatar(blob)
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
    createProfile({
      id: id, //id was taken from the string 30
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
    })
  }

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return (
    isAuth && (
      <ProfileLayout>
        <div className={s.container}>
          <MenuContainer />
          <div className={s.containerInfo}>
            <ProfileSettings
              userName={userName}
              onSubmitHandler={submit}
              avatar={avatar}
              croppedAvatar={croppedAvatar}
              setCroppedAvatar={setCroppedAvatar}
              setAvatar={setAvatar}
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
  )
}

export default Index
