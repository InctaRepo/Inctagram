import React, { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'
import AvatarEditor from 'react-avatar-editor'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetProfileQuery } from '@/src/features/profile/service'
import {
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from '@/src/features/profileSettings/service'
import { Settings } from '@/src/features/profileSettings/settings'
import s from '@/src/features/profileSettings/ui/profileSettings.module.scss'
import { RouteNames } from '@/src/shared/const/routeNames'
import { useGetMeQuery } from '@/src/shared/hoc'
import { useErrorToast } from '@/src/shared/hooks'
import { ProfileSettingSchema } from '@/src/shared/schemas/profileSettingSchema'
import { Sidebar } from '@/src/shared/sidebar'

export const ProfileSettings = () => {
  const { push } = useRouter()
  const [updateProfile, { isSuccess: isSuccessUpdate }] = useUpdateProfileMutation()
  const [createProfile, { isSuccess }] = useCreateProfileMutation()
  const { data: user } = useGetMeQuery()
  const id = user?.data?.userId
  const userNameFromMe = user?.data?.username
  const { data: profile } = useGetProfileQuery(id, {
    refetchOnMountOrArgChange: true,
  })
  const [uploadAvatar] = useUploadAvatarMutation()

  const editorRef = useRef<AvatarEditor>(null)
  const [avatar, setAvatar] = useState<FormData | null>(null)
  const [croppedAvatar, setCroppedAvatar] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const successRes =
    (isSuccess && profile?.resultCode === 0) || (isSuccessUpdate && profile?.resultCode === 0)

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
          uploadAvatar(formData)
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

  const submit = (data: ProfileSettingSchema) => {
    profile?.data
      ? updateProfile({
          userId: id, //id was taken from the line 29
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.country,
          city: data.city,
          dateOfBirth: data.dateOfBirthday,
          aboutMe: data.aboutMe,
          avatar: data.avatar,
        })
          .then(() => {
            uploadAvatar(avatar!)
              .unwrap()
              .then(() => {
                setIsModalOpen(false)
                setSelectedImage(null)
              })
          })
          .then(() => {
            push(RouteNames.PROFILE)
          })
      : createProfile({
          userId: id,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.country,
          city: data.city,
          dateOfBirth: data.dateOfBirthday,
          aboutMe: data.aboutMe,
          avatar: data.avatar,
        })
          .then(() => {
            uploadAvatar(avatar!)
              .unwrap()
              .then(() => {
                setIsModalOpen(false)
                setSelectedImage(null)
              })
          })
          .then(() => {
            push(RouteNames.PROFILE)
          })
  }

  const setToastHandler = () => {
    if (successRes) {
      useErrorToast(true, false, true)
    }
  }

  useEffect(() => {
    if (isSuccess || isSuccessUpdate) {
      setToastHandler()
    }
  }, [isSuccess, isSuccessUpdate])

  return (
    <div className={s.container}>
      <Sidebar />
      <div className={s.containerInfo}>
        <Settings
          userNameFromMe={userNameFromMe}
          userData={profile?.data}
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
  )
}
