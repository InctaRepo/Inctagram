import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { AvaModalDynamic } from '@/entities/profile/avaModal'
import {
  useCreateProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from '@/entities/profile/service'
import s from '@/entities/profile/settings/generalInformation/ui/generalInformation.module.scss'
import { GeneralInformationForm } from '@/entities/profile/settings/generalInformation/ui/generalInformationForm'
import { getUserId } from '@/shared/hoc'
import { useAppDispatch, useAppSelector, useErrorToast } from '@/shared/hooks'
import { ProfileSettingSchema } from '@/shared/schemas/profileSettingSchema'
import { setProfileFound } from '@/shared/sidebar'
import { Loader } from '@/ui/loader'

export const GeneralInformation = () => {
  const dispatch = useAppDispatch()
  const [avatar, setAvatar] = useState<FormData | null>(null)
  const { push } = useRouter()
  const [updateProfile, { isSuccess: isSuccessUpdate, isLoading: isLoadingUpdate }] =
    useUpdateProfileMutation()
  const [createProfile, { isSuccess: isSuccessCreate, isLoading: isLoadingCreate }] =
    useCreateProfileMutation()
  const userId = useAppSelector(getUserId) as string
  const { data: profile, isLoading, isSuccess } = useGetProfileQuery(userId)
  const userData = profile?.data
  const [uploadAvatar, { isSuccess: isSuccessAvatar, isLoading: isLoadingAva }] =
    useUploadAvatarMutation()

  const successRes =
    (isSuccessCreate && profile?.resultCode === 0) || (isSuccessUpdate && profile?.resultCode === 0)
  const onFormSubmit = (data: ProfileSettingSchema) => {
    profile?.data
      ? updateProfile({
          userId: userId,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.city.split(',')[1] || '',
          city: data.city.split(',')[0] || '',
          dateOfBirth: data.dateOfBirthday,
          aboutMe: data.aboutMe,
          avatar: data.avatar,
        }).then(() => {
          if (avatar !== null) {
            uploadAvatar(avatar!)
          }
        })
      : createProfile({
          userId: userId,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.city.split(',')[1] || '',
          city: data.city.split(',')[0] || '',
          dateOfBirth: data.dateOfBirthday,
          aboutMe: data.aboutMe,
          avatar: data.avatar,
        }).then(() => {
          if (avatar !== null) {
            uploadAvatar(avatar!)
          }
          dispatch(setProfileFound(true))
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
      // push(RouteNames.PROFILE_SETTINGS)
      // push(RouteNames.PROFILE + '/' + userId)
    }
  }, [isSuccessCreate, isSuccessUpdate, isSuccessAvatar, avatar])

  if (isLoadingAva || isLoading || isLoadingCreate || isLoadingUpdate) return <Loader />
  // if ((isSuccessCreate || isSuccessUpdate) && (avatar === null || isSuccessAvatar))
  //   return <Loader />

  return (
    <div className={s.profile}>
      <div className={s.content}>
        <div className={s.photoContent}>
          <AvaModalDynamic avatar={userData?.avatar!} setAvatar={setAvatar} />
        </div>
        {isSuccess && (
          <GeneralInformationForm onSubmitHandler={onFormSubmit} userData={userData!} />
        )}
      </div>
    </div>
  )
}
