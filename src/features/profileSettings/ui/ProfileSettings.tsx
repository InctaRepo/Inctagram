import React, { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'
import AvatarEditor from 'react-avatar-editor'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { getProfile, useGetProfileQuery } from '@/src/features/profile/service'
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
import { useAppDispatch, useAppSelector, useErrorToast } from '@/src/shared/hooks'
import { ProfileSettingSchema } from '@/src/shared/schemas/profileSettingSchema'
import { Sidebar } from '@/src/shared/sidebar'

export const ProfileSettings = () => {
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const [updateProfile, { isSuccess: isSuccessUpdate }] = useUpdateProfileMutation()
  const [createProfile, { isSuccess }] = useCreateProfileMutation()
  const userId = useAppSelector(getUserId)
  const userName = useAppSelector(getUsername)
  const { data: profile } = useGetProfileQuery(userId, {
    refetchOnMountOrArgChange: true,
  })
  const [uploadAvatar] = useUploadAvatarMutation()

  const editorRef = useRef<AvatarEditor>(null)
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
          setIsModalOpen(false)
          setSelectedImage(null)
          uploadAvatar(formData)
        }
      })
    }
  }

  const submit = (data: ProfileSettingSchema) => {
    profile?.data
      ? updateProfile({
          userId: userId, //id was taken from the line 29
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.country,
          city: data.city,
          dateOfBirth: data.dateOfBirthday,
          aboutMe: data.aboutMe,
          // avatar: data.avatar,
        })
          .then(() => {
            setIsModalOpen(false)
            setSelectedImage(null)
          })

          .then(() => {
            dispatch(getProfile.initiate(userId))
            push(RouteNames.PROFILE + '/' + userId)
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
          // avatar: data.avatar,
        })
          .then(() => {
            setIsModalOpen(false)
            setSelectedImage(null)
          })
          .then(() => {
            dispatch(getProfile.initiate(userId))
            push(RouteNames.PROFILE + '/' + userId)
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
