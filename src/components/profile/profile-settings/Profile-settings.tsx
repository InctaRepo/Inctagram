import React, { useEffect } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import s from './profileSettings.module.scss'

import { useTranslate } from '@/src/assets/hooks/useTranslate'
import { CalendarOutline } from '@/src/assets/icons/calendar-outline'
import { ImgOutline } from '@/src/assets/icons/image-outline'
import { FormFields, triggerZodFieldError } from '@/src/common/helpers/updateZodError'
import {
  ProfileSettingFormType,
  createProfileSettingSchema,
} from '@/src/common/schemas/profile-setting-schema'
import { Button } from '@/src/components/ui/button'
import { ControlledTextField } from '@/src/components/ui/controlled'
import { TextAreaField } from '@/src/components/ui/text-area'
import { Typography } from '@/src/components/ui/typography'

type ProfileSettingFormPropsType = {
  onSubmitHandler: (data: ProfileSettingFormType) => void
}

export const ProfileSettings = ({ onSubmitHandler }: ProfileSettingFormPropsType) => {
  const { t } = useTranslate()

  const router = useRouter()

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
    // TODO:  it works ! but need to replace this handler (not a good one)
  }, [t])

  const onSubmit = handleSubmit((data: ProfileSettingFormType) => {
    onSubmitHandler(data)
  })

  return (
    <div className={s.profile}>
      <div className={s.content}>
        <nav>
          <ul className={s.navMenu}>
            <li>
              <Link className={s.link} href={'/'}>
                <Typography variant={'h3'} color="secondary">
                  {t.profile.profileSetting.generalInformation}
                </Typography>
              </Link>
            </li>
            <li>
              <Link className={s.link} href={'/devices'}>
                <Typography variant={'h3'} color="secondary">
                  {t.profile.profileSetting.devices}
                </Typography>
              </Link>
            </li>
            <li>
              <Link className={s.link} href={'/account-management'}>
                <Typography variant={'h3'} color="secondary">
                  {t.profile.profileSetting.accountManagement}
                </Typography>
              </Link>
            </li>
            <li>
              <Link className={s.link} href={'/my-payment'}>
                <Typography variant={'h3'} color="secondary">
                  {t.profile.profileSetting.myPayment}
                </Typography>
              </Link>
            </li>
          </ul>
        </nav>

        <div className={s.userInfo}>
          <div className={s.photoContent}>
            <div className={s.photo}>
              <div className={s.ellipse}></div>
              <div className={s.image}>
                <ImgOutline />
              </div>
            </div>

            <Button variant="outlined" className={s.addBtn}>
              {t.profile.profileSetting.addAProfilePhoto}
            </Button>
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
                placeholder="00.00.00"
              />

              <ControlledTextField
                control={control}
                name={'city'}
                label={t.profile.profileSetting.city}
                className={s.field}
              />
              <TextAreaField
                className={s.textArea}
                fullWidth={true}
                label={t.profile.profileSetting.aboutMe}
              />
            </form>
            <CalendarOutline className={s.calendar} />
          </div>
        </div>

        <Button type={'submit'} variant="primary" className={s.saveBtn}>
          {t.profile.profileSetting.saveChanges}
        </Button>
      </div>
    </div>
  )
}
