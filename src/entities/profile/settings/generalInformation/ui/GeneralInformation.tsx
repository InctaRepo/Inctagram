import React, { useEffect, useRef, useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseISO } from 'date-fns'
import { useRouter } from 'next/router'
import AvatarEditor from 'react-avatar-editor'
import { useForm } from 'react-hook-form'

import { AvaModalDynamic } from '@/entities/profile/avaModal'
import {
  useCreateProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from '@/entities/profile/service'
import s from '@/entities/profile/settings/generalInformation/ui/generalInformation.module.scss'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { getUserId } from '@/features/auth/signIn'
import { RouteNames } from '@/shared/const'
import { Countries } from '@/shared/countries/countries'
import { convertFileToBase64 } from '@/shared/helpers/convertFileToBase64'
import { FormFields, triggerZodFieldError } from '@/shared/helpers/updateZodError'
import { getUsername } from '@/shared/hoc'
import { useAppDispatch, useAppSelector, useErrorToast, useTranslate } from '@/shared/hooks'
import {
  createProfileSettingSchema,
  ProfileSettingSchema,
} from '@/shared/schemas/profileSettingSchema'
import { setProfileFound } from '@/shared/sidebar'
import { Button } from '@/ui/button'
import {
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextArea,
  ControlledTextField,
} from '@/ui/controlled'
import { Loader } from '@/ui/loader'
import { Options } from '@/ui/selectBox'

export const GeneralInformation = () => {
  const dispatch = useAppDispatch()
  const [_, setValue] = useState('')
  const editorRef = useRef<AvatarEditor>(null)
  const [croppedAvatar, setCroppedAvatar] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [cities, setCities] = useState<Options[]>([])
  const [avatar, setAvatar] = useState<FormData | null>(null)
  const { t } = useTranslate()
  const { push } = useRouter()
  const [updateProfile, { isSuccess: isSuccessUpdate, isLoading: isLoadingUpdate }] =
    useUpdateProfileMutation()
  const [createProfile, { isSuccess: isSuccessCreate, isLoading: isLoadingCreate }] =
    useCreateProfileMutation()
  const userId = useAppSelector(getUserId)
  const userName = useAppSelector(getUsername)
  const { data: profile, isLoading } = useGetProfileQuery(userId)
  const [uploadAvatar, { isSuccess: isSuccessAvatar, isLoading: isLoadingAva }] =
    useUploadAvatarMutation()
  const userData = profile?.data
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
  const successRes =
    (isSuccessCreate && profile?.resultCode === 0) || (isSuccessUpdate && profile?.resultCode === 0)
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
            dispatch(setProfileFound(true))
          })
          .then(() => {
            setIsModalOpen(false)
            setSelectedImage(null)
          })
  }

  function getCountries(arr: any) {
    return arr.map((el: { country: string; cities: string }) => ({
      value: el.country,
      cities: el.cities,
    }))
  }

  const countriesList = getCountries(Countries.data)

  function getCities(arr: any) {
    return arr.map((el: string) => ({ value: el }))
  }

  const changeCountryHandler = (country: string | number) => {
    if (!country) {
      return null
    }
    const cities = countriesList.find((c: { value: string | number }) => c.value === country)

    setCities(cities.cities)

    const citiesSelected = getCities(cities.cities)

    setCities(citiesSelected)
  }

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
  } = useForm<ProfileSettingSchema>({
    resolver: zodResolver(createProfileSettingSchema(t)),
    mode: 'onChange',
    defaultValues: {
      username: userData ? userData.username : userName,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      dateOfBirthday: userData?.dateOfBirth ? parseISO(`${userData.dateOfBirth}`) : new Date(),
      country: userData?.country,
      city: userData?.city,
      aboutMe: userData?.aboutMe || '',
      avatar: userData?.avatar || '',
    },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t])

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
    <div className={s.profile}>
      <div className={s.content}>
        <div className={s.photoContent}>
          <div className={s.addBtn}>
            <AvaModalDynamic
              avatar={userData?.avatar!}
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

        <form onSubmit={handleSubmit(submit)} className={s.editForm}>
          <DevTool control={control} />
          <ControlledTextField
            control={control}
            name={'username'}
            label={t.profileSetting.generalInformation.userName}
            className={s.field}
            isRequired
          />
          <ControlledTextField
            control={control}
            name={'firstName'}
            label={t.profileSetting.generalInformation.firstName}
            className={s.field}
            isRequired
          />
          <ControlledTextField
            control={control}
            name={'lastName'}
            label={t.profileSetting.generalInformation.lastName}
            className={s.field}
            isRequired
          />
          <div className={s.datePicker}>
            <ControlledDatePicker
              control={control}
              className={s.date}
              label={t.profileSetting.generalInformation.dateOfBirthday}
              name={'dateOfBirthday'}
              errorMessage={errors.dateOfBirthday?.message}
            />
          </div>

          <div className={s.fieldSelect}>
            <div className={s.select}>
              <ControlledSelect
                control={control}
                name="country"
                options={countriesList}
                label={t.profileSetting.generalInformation.selectYourCountry}
                onValueChange={changeCountryHandler}
                defaultValue={t.profileSetting.generalInformation.country}
              />
            </div>
            <div className={s.select}>
              <ControlledSelect
                control={control}
                name="city"
                options={cities}
                label={t.profileSetting.generalInformation.selectYourCity}
                defaultValue={t.profileSetting.generalInformation.city}
              />
            </div>
          </div>
          <ControlledTextArea
            control={control}
            className={s.textArea}
            setValue={setValue}
            name={'aboutMe'}
            fullWidth={true}
            label={t.profileSetting.generalInformation.aboutMe}
          />

          <div className={s.saveBtn}>
            <Button type="submit" fullWidth variant="primary">
              {t.profileSetting.generalInformation.saveChanges}
            </Button>
          </div>
        </form>
      </div>
      <div className={`${s.grayLine} ${errors.dateOfBirthday && s.grayLineError}`} />
    </div>
  )
}
