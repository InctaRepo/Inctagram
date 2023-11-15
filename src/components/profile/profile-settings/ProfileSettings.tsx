import React, { useEffect, useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { default as Axios } from 'axios'
import { parseISO } from 'date-fns'
import AvatarEditor from 'react-avatar-editor'
import { useForm } from 'react-hook-form'

import s from './ProfileSettings.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { ImgOutline } from '@/src/assets/icons/image-outline'
import { FormFields, triggerZodFieldError } from '@/src/common/helpers/updateZodError'
import {
  createProfileSettingSchema,
  ProfileSettingForm,
} from '@/src/common/schemas/profileSettingSchema'
import { SettingPhotoModal } from '@/src/components/profile/profile-setting/setting-photo-modal'
import { Button } from '@/src/components/ui/button'
import {
  ControlledDatePick,
  ControlledSelect,
  ControlledTextArea,
  ControlledTextField,
} from '@/src/components/ui/controlled'
import { TabsComponent } from '@/src/components/ui/tabs'
import { UserInfo } from '@/src/services/profile/profileApi.types'
import { Options } from 'src/components/ui/select-box'

type ProfileSettingFormProps = {
  onSubmitHandler: (data: ProfileSettingForm) => void
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  selectedImage: File | null
  setSelectedImage: (selectedImage: File | null) => void
  editorRef: React.RefObject<AvatarEditor>
  handleSavePhoto: () => void
  croppedAvatar: string | null
  setCroppedAvatar: (croppedAvatar: string | null) => void
  userData?: UserInfo
  userNameFromMe: string | undefined
}
export const ProfileSettings = ({
  croppedAvatar,
  setCroppedAvatar,
  isModalOpen,
  setIsModalOpen,
  selectedImage,
  setSelectedImage,
  editorRef,
  handleSavePhoto,
  onSubmitHandler,
  userData,
  userNameFromMe,
}: ProfileSettingFormProps) => {
  const [_, setValue] = useState('')
  const [countries, setCountries] = useState<Options[]>([])
  const [cities, setCities] = useState<Options[]>([])
  const { t } = useTranslate()

  const fetchCountries = async () => {
    let country = await Axios.get('https://countriesnow.space/api/v0.1/countries')

    setCountries(country.data.data)
  }

  function getCountries(arr: any) {
    return arr.map((el: { country: string; cities: string }) => ({
      value: el.country,
      cities: el.cities,
    }))
  }

  const countriesList = getCountries(countries)

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
  } = useForm<ProfileSettingForm>({
    resolver: zodResolver(createProfileSettingSchema(t)),
    mode: 'onChange',
    defaultValues: {
      username: userData ? userData.username : userNameFromMe,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      dateOfBirthday: userData?.dateOfBirth ? parseISO(`${userData.dateOfBirth}`) : new Date(),
      country: userData?.country,
      city: userData?.city,
      aboutMe: userData?.aboutMe,
      avatar: userData?.avatar,
    },
  })

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t])

  const submitData = (data: ProfileSettingForm) => {
    onSubmitHandler(data)
  }

  return (
    <>
      <div className={s.profile}>
        <div className={s.tabsMenu}>
          <TabsComponent
            tabs={[
              {
                label: `${t.profile.profileSetting.generalInformation}`,
                value: 'settings',
              },
              { label: `${t.profile.profileSetting.devices}`, value: 'devices' },
              {
                label: `${t.profile.profileSetting.accountManagement}`,
                value: 'account-management',
              },
              { label: `${t.profile.profileSetting.myPayment}`, value: 'my-payment' },
            ]}
          />
        </div>
        <div className={s.content}>
          <div className={s.photoContent}>
            {!croppedAvatar && !userData?.avatar && (
              <div className={s.photo}>
                <div className={s.ellipse}></div>
                <div className={s.image}>
                  <ImgOutline />
                </div>
              </div>
            )}
            <div className={s.addBtn}>
              <SettingPhotoModal
                avatar={userData?.avatar}
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

          <div>
            <form onSubmit={handleSubmit(submitData)} className={s.editForm}>
              <DevTool control={control} />
              <ControlledTextField
                control={control}
                name={'username'}
                label={t.profile.profileSetting.userName}
                className={s.field}
                isRequired
              />
              <ControlledTextField
                control={control}
                name={'firstName'}
                label={t.profile.profileSetting.firstName}
                className={s.field}
                isRequired
              />
              <ControlledTextField
                control={control}
                name={'lastName'}
                label={t.profile.profileSetting.lastName}
                className={s.field}
                isRequired
              />
              <div className={s.datePicker}>
                <ControlledDatePick
                  control={control}
                  className={s.date}
                  label={t.profile.profileSetting.dateOfBirthday}
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
                    label={t.profile.profileSetting.selectYourCountry}
                    onValueChange={changeCountryHandler}
                    defaultValue={t.profile.profileSetting.country}
                  />
                </div>
                <div className={s.select}>
                  <ControlledSelect
                    control={control}
                    name="city"
                    options={cities}
                    label={t.profile.profileSetting.selectYourCity}
                    defaultValue={t.profile.profileSetting.city}
                  />
                </div>
              </div>
              <ControlledTextArea
                control={control}
                className={s.textArea}
                setValue={setValue}
                name={'aboutMe'}
                fullWidth={true}
                label={t.profile.profileSetting.aboutMe}
              />

              <div className={s.saveBtn}>
                <Button type="submit" fullWidth variant="primary">
                  {t.profile.profileSetting.saveChanges}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className={`${s.grayLine} ${errors.dateOfBirthday && s.grayLineError}`} />
      </div>
    </>
  )
}
