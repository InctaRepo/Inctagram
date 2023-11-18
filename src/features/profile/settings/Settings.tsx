import React, { useEffect, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetMeQuery } from '@/src/features/auth/authService'
import { useErrorToast } from '@/src/shared/hooks'
import { ProfileSettingForm } from '@/src/shared/schemas/profileSettingSchema'
import { Sidebar } from '@/src/shared/sidebar'
import s from '../profile.module.scss'
import { ProfileSettings } from '../profileSettings/ProfileSettings'
import {
  useCreateProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from '../service/profileApi'

export const Settings = () => {
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

  const submit = (data: ProfileSettingForm) => {
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
  )
}
