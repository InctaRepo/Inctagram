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
import { convertFileToBase64 } from '@/src/shared/helpers/convertFileToBase64'
import { getUserId, getUsername } from '@/src/shared/hoc'
import { useAppSelector, useErrorToast } from '@/src/shared/hooks'
import { ProfileSettingSchema } from '@/src/shared/schemas/profileSettingSchema'
import { Sidebar } from '@/src/shared/sidebar'
import { Loader } from '@/src/shared/ui/loader'

export const ProfileSettings = () => {
  const { push } = useRouter()
  const [updateProfile, { isSuccess: isSuccessUpdate, isLoading: isLoadingUpdate }] =
    useUpdateProfileMutation()
  const [createProfile, { isSuccess: isSuccessCreate, isLoading: isLoadingCreate }] =
    useCreateProfileMutation()
  const userId = useAppSelector(getUserId)
  const userName = useAppSelector(getUsername)
  const { data: profile, isSuccess: isSuccessProfile, isLoading } = useGetProfileQuery(userId)
  const [uploadAvatar, { isSuccess: isSuccessAvatar, isLoading: isLoadingAva }] =
    useUploadAvatarMutation()
  const editorRef = useRef<AvatarEditor>(null)
  const [croppedAvatar, setCroppedAvatar] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const successRes =
    (isSuccessCreate && profile?.resultCode === 0) || (isSuccessUpdate && profile?.resultCode === 0)
  const [avatar, setAvatar] = useState<FormData | null>(null)

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

  const submit = (data: ProfileSettingSchema) => {
    profile?.data
      ? updateProfile({
          userId: userId,
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
            if (avatar !== null) {
              uploadAvatar(avatar!)
            }
          })
          .then(() => {
            setIsModalOpen(false)
            setSelectedImage(null)
          })
      : createProfile({
          userId: userId,
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
            if (avatar !== null) {
              uploadAvatar(avatar!)
            }
          })
          .then(() => {
            setIsModalOpen(false)
            setSelectedImage(null)
          })
  }

  const setToastHandler = () => {
    if (successRes) {
      useErrorToast(true, false, true)
    }
  }

  useEffect(() => {
    if ((isSuccessCreate || isSuccessUpdate) && (avatar === null || isSuccessAvatar)) {
      setToastHandler()
      push(RouteNames.PROFILE + '/' + userId)
    }
  }, [isSuccessCreate, isSuccessUpdate, isSuccessAvatar, avatar])

  if (isLoadingAva || isLoading || isLoadingCreate || isLoadingUpdate) return <Loader />
  if ((isSuccessCreate || isSuccessUpdate) && (avatar === null || isSuccessAvatar))
    return <Loader />

  return (
    <div className={s.container}>
      <Sidebar />
      <div className={s.containerInfo}>
        <Settings
          userNameFromMe={userName}
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
