import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { AvaModalDynamic } from '@/entities/profile/avaModal'
import {
  useCreateProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from '@/entities/profile/service'
import { GeneralInformationForm } from '@/entities/profile/settings/generalInformation/ui/generalInformationForm'
import { RouteNames } from '@/shared/const'
import { getUserId } from '@/shared/hoc'
import { useAppDispatch, useAppSelector, useErrorToast } from '@/shared/hooks'
import { ProfileSettingSchema } from '@/shared/schemas/profileSettingSchema'
import { setProfileFound } from '@/shared/sidebar'
import { Loader } from '@/ui/loader'
import { useRouter } from 'next/router'

import s from '@/entities/profile/settings/generalInformation/ui/generalInformation.module.scss'

export const GeneralInformation = memo(function GeneralInformation() {
  const dispatch = useAppDispatch()
  const [avatar, setAvatar] = useState<FormData | null>(null)
  const { push } = useRouter()
  const [updateProfile, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate }] =
    useUpdateProfileMutation()
  const [createProfile, { isLoading: isLoadingCreate, isSuccess: isSuccessCreate }] =
    useCreateProfileMutation()
  const userId = useAppSelector(getUserId) as string
  const { data: profile, isLoading, isSuccess } = useGetProfileQuery(userId)
  const userData = useMemo(() => {
    return profile?.data
  }, [profile?.data])
  const [uploadAvatar, { isLoading: isLoadingAva, isSuccess: isSuccessAvatar }] =
    useUploadAvatarMutation()

  const successRes =
    (isSuccessCreate && profile?.resultCode === 0) || (isSuccessUpdate && profile?.resultCode === 0)
  const onFormSubmit = useCallback(
    (data: ProfileSettingSchema) => {
      userData
        ? updateProfile({
            aboutMe: data.aboutMe,
            avatar: data.avatar,
            city: data.city.split(',')[0] || '',
            country: data.city.split(',')[1] || '',
            dateOfBirth: data.dateOfBirthday,
            firstName: data.firstName,
            lastName: data.lastName,
            userId: userId,
            username: data.username,
          }).then(() => {
            if (avatar !== null) {
              uploadAvatar(avatar!)
            }
          })
        : createProfile({
            aboutMe: data.aboutMe,
            avatar: data.avatar,
            city: data.city.split(',')[0] || '',
            country: data.city.split(',')[1] || '',
            dateOfBirth: data.dateOfBirthday,
            firstName: data.firstName,
            lastName: data.lastName,
            userId: userId,
            username: data.username,
          }).then(() => {
            if (avatar !== null) {
              uploadAvatar(avatar!)
            }
            dispatch(setProfileFound(true))
          })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userData]
  )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setToastHandler = () => {
    if (successRes) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useErrorToast(true, false, true)
    }
  }

  useEffect(() => {
    if ((isSuccessCreate || isSuccessUpdate) && (avatar === null || isSuccessAvatar)) {
      setToastHandler()
      push(RouteNames.PROFILE + '/' + userId)
    }
  }, [isSuccessCreate, isSuccessUpdate, isSuccessAvatar, avatar, setToastHandler, push, userId])

  if (isLoadingAva || isLoading || isLoadingCreate || isLoadingUpdate) {
    return <Loader />
  }

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
})
