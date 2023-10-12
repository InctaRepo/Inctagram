import { useContext, useEffect, useRef, useState } from 'react'

import { useParams } from 'next/navigation'
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
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from '@/src/services/profile/profile-api'
import { ProfileLayout } from 'src/components/layout/profile-layout'

const Index = () => {
  const isAuth = useAppSelector(authIsAuthSelector)

  const router = useRouter()
  const [updateProfile] = useUpdateProfileMutation()
  const [createProfile, { isSuccess, isLoading, error }] = useCreateProfileMutation()
  const { data: user } = useGetMeQuery()
  const [uploadAvatar] = useUploadAvatarMutation()

  const editorRef = useRef<AvatarEditor>(null)
  const [avatar, setAvatar] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const formData = new FormData()
  const handleSaveAvatar = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas()

      canvas.toBlob(blob => {
        if (blob) {
          const file = new File([blob], 'avatar', { type: blob.type })

          convertFileToBase64(file, (file64: string) => {
            setAvatar(file64)
          })

          formData.append('file', file)
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
      id: user?.data?.userId, //data was taken from the string 28
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      country: data.country,
      city: data.city,
      dateOfBirth: data.dateOfBirthday,
      aboutMe: data.aboutMe,
      avatar: data.avatar,
    }).then(() => {
      uploadAvatar(formData)
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
              onSubmitHandler={submit}
              avatar={avatar}
              setAvatar={setAvatar}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              editorRef={editorRef}
              handleSaveAvatar={handleSaveAvatar}
            />
          </div>
        </div>
      </ProfileLayout>
    )
  )
}

export default Index
