import React, { useEffect, useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import s from './profileSettings.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { CalendarOutline } from '@/src/assets/icons/calendar-outline'
import { ImgOutline } from '@/src/assets/icons/image-outline'
import { FormFields, triggerZodFieldError } from '@/src/common/helpers/updateZodError'
import {
  createProfileSettingSchema,
  ProfileSettingFormType,
} from '@/src/common/schemas/profile-setting-schema'
import { SettingPhotoModal } from '@/src/components/profile/profile-setting/setting-photo-modal/setting-photo-modal'
import { Button } from '@/src/components/ui/button'
import { ControlledTextField } from '@/src/components/ui/controlled'
import { TextAreaField } from '@/src/components/ui/text-area'
import { Typography } from '@/src/components/ui/typography'
import { SelectBox } from 'src/components/ui/select-box'

type ProfileSettingFormPropsType = {
  onSubmitHandler?: (data: ProfileSettingFormType) => void
  defaultValue?: string | number
}

export const ProfileSettings = ({ onSubmitHandler, defaultValue }: ProfileSettingFormPropsType) => {
  const { t } = useTranslate()
  const router = useRouter()

  //const [city, setCity] = useState(defaultValue ? defaultValue.toString() : 'City')

  const {
    control,
    handleSubmit,
    formState,
    trigger,
    formState: { touchedFields },
  } = useForm<ProfileSettingFormType>({
    resolver: zodResolver(createProfileSettingSchema(t)),
    mode: 'onTouched',
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      dateOfBirthday: '',
      city: '',
      aboutMe: '',
    },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t])

  const onSubmit = handleSubmit((data: ProfileSettingFormType) => {
    onSubmitHandler?.(data)
  })

  const changeCityHandler = (newCity: string | number) => {}

  return (
    <>
      <div className={s.profile}>
        <nav>
          <ul className={s.navMenu}>
            <li className={s.generalLink}>
              <Link className={s.link} href={'/settings'}>
                <Typography variant={'h3'} className={s.general}>
                  {t.profile.profileSetting.generalInformation}
                </Typography>
              </Link>
            </li>
            <li className={s.oneLink}>
              <Link className={s.link} href={'/devices'}>
                <Typography variant={'h3'} color="secondary">
                  {t.profile.profileSetting.devices}
                </Typography>
              </Link>
            </li>
            <li className={s.oneLink}>
              <Link className={s.link} href={'/account-management'}>
                <Typography variant={'h3'} color="secondary">
                  {t.profile.profileSetting.accountManagement}
                </Typography>
              </Link>
            </li>
            <li className={s.oneLink}>
              <Link className={s.link} href={'/my-payment'}>
                <Typography variant={'h3'} color="secondary">
                  {t.profile.profileSetting.myPayment}
                </Typography>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={s.content}>
          <div className={s.photoContent}>
            <div className={s.photo}>
              <div className={s.ellipse}></div>
              <div className={s.image}>
                <ImgOutline />
              </div>
            </div>
            <div className={s.addBtn}>
              <SettingPhotoModal />
            </div>
          </div>

          <div>
            <form onSubmit={onSubmit} className={s.editForm}>
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
              <ControlledTextField
                control={control}
                name={'dateOfBirthday'}
                label={t.profile.profileSetting.dateOfBirthday}
                className={s.date}
                placeholder="00.00.0000"
              />
              <div className={s.fieldSelect}>
                <SelectBox
                  label={t.profile.profileSetting.selectYourCity}
                  onValueChange={changeCityHandler}
                  defaultValue={t.profile.profileSetting.city}
                />
              </div>

              <TextAreaField
                className={s.textArea}
                fullWidth={true}
                label={t.profile.profileSetting.aboutMe}
              />
            </form>
            <CalendarOutline className={s.calendar} />
          </div>
        </div>
        <div className={s.saveBtn}>
          <Button type={'submit'} variant="primary">
            {t.profile.profileSetting.saveChanges}
          </Button>
        </div>
      </div>
    </>
  )
}
