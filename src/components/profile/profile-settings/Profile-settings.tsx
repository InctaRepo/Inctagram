import React, { useEffect, useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { default as Axios } from 'axios'
import { useRouter } from 'next/router'
import AvatarEditor from 'react-avatar-editor'
import { useForm } from 'react-hook-form'

import s from './profileSettings.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { ImgOutline } from '@/src/assets/icons/image-outline'
import { FormFields, triggerZodFieldError } from '@/src/common/helpers/updateZodError'
import {
  createProfileSettingSchema,
  ProfileSettingFormType,
} from '@/src/common/schemas/profile-setting-schema'
import { SettingPhotoModal } from '@/src/components/profile/profile-setting/setting-photo-modal/setting-photo-modal'
import { Button } from '@/src/components/ui/button'
import { ControlledTextField } from '@/src/components/ui/controlled'
import { ControlledDatePick } from '@/src/components/ui/controlled/controlled-data-picker'
import { ControlledSelect } from '@/src/components/ui/controlled/controlled-select'
import { ControlledTextArea } from '@/src/components/ui/controlled/controlled-text-area'
import { TabsComponent } from '@/src/components/ui/tabs'
import { OptionsType } from 'src/components/ui/select-box'

type ProfileSettingFormPropsType = {
  onSubmitHandler: (data: ProfileSettingFormType) => void
  children?: any
  avatar: string | null
  setAvatar: (avatar: string | null) => void
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  selectedImage: File | null
  setSelectedImage: (selectedImage: File | null) => void
  editorRef: React.RefObject<AvatarEditor>
  handleSavePhoto: () => void
}

export const ProfileSettings = ({
  onSubmitHandler,
  avatar,
  setAvatar,
  isModalOpen,
  setIsModalOpen,
  selectedImage,
  setSelectedImage,
  editorRef,
  handleSavePhoto,
}: ProfileSettingFormPropsType) => {
  const [countries, setCountries] = useState<OptionsType[]>([])
  const [cities, setCities] = useState<OptionsType[]>([])
  const { t } = useTranslate()
  const router = useRouter()

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
    const cities = countriesList.find((c: { value: string | number }) => c.value === country)

    // @ts-ignore
    setCities(cities.cities)

    // @ts-ignore
    const citiesSelected = getCities(cities.cities)

    setCities(citiesSelected)
  }

  const changeCityHandler = (newCity: string | number) => {}

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
  } = useForm<ProfileSettingFormType>({
    resolver: zodResolver(createProfileSettingSchema(t)),
    mode: 'onChange',
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      dateOfBirthday: new Date(),
      country: '',
      city: '',
      aboutMe: '',
      avatar: '',
    },
  })

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t])

  const submitData = (data: ProfileSettingFormType) => {
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
            <div className={s.photo}>
              <div className={s.ellipse}></div>
              <div className={s.image}>
                <ImgOutline />
              </div>
            </div>
            <div className={s.addBtn}>
              <SettingPhotoModal
                avatar={avatar}
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

          <div>
            <form onSubmit={handleSubmit(submitData)} className={s.editForm}>
              <DevTool control={control} />
              <ControlledTextField
                control={control}
                name={'username'}
                label={t.profile.profileSetting.userName}
                className={s.field}
              />
              <ControlledTextField
                control={control}
                name={'firstName'}
                label={t.profile.profileSetting.firstName}
                className={s.field}
              />
              <ControlledTextField
                control={control}
                name={'lastName'}
                label={t.profile.profileSetting.lastName}
                className={s.field}
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
                    onValueChange={changeCityHandler}
                    defaultValue={t.profile.profileSetting.city}
                  />
                </div>
              </div>
              <ControlledTextArea
                control={control}
                className={s.textArea}
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
