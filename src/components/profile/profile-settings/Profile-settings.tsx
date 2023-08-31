import React from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './profileSettings.module.scss'

import { useTranslate } from '@/src/assets/hooks/useTranslate'
import { CalendarOutline } from '@/src/assets/icons/calendar-outline'
import { ImgOutline } from '@/src/assets/icons/image-outline'
import { profileSettingSchema } from '@/src/common/schemas/profile-setting-schema'
import { Button } from '@/src/components/ui/button'
import { ControlledTextField } from '@/src/components/ui/controlled'
import { TextAreaField } from '@/src/components/ui/text-area'
import { Typography } from '@/src/components/ui/typography'

export type ProfileSettingType = z.infer<typeof profileSettingSchema>

type ProfileSettingPropsType = {
  onSubmitHandler: (data: ProfileSettingType) => void
}

export const ProfileSettings = (props: ProfileSettingPropsType) => {
  const { onSubmitHandler } = props
  const { t } = useTranslate()

  const { control, handleSubmit } = useForm<ProfileSettingType>({
    resolver: zodResolver(profileSettingSchema),
    mode: 'onChange',
  })

  const onSubmit = handleSubmit((data: ProfileSettingType) => {
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
                  {t.profileSettings.generalInformation}
                </Typography>
              </Link>
            </li>
            <li>
              <Link className={s.link} href={'/devices'}>
                <Typography variant={'h3'} color="secondary">
                  {t.profileSettings.devices}
                </Typography>
              </Link>
            </li>
            <li>
              <Link className={s.link} href={'/account-management'}>
                <Typography variant={'h3'} color="secondary">
                  {t.profileSettings.accountManagement}
                </Typography>
              </Link>
            </li>
            <li>
              <Link className={s.link} href={'/my-payment'}>
                <Typography variant={'h3'} color="secondary">
                  {t.profileSettings.myPayment}
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
              {t.profileSettings.addAProfilePhoto}
            </Button>
          </div>
          <div>
            <form onSubmit={onSubmit} className={s.editForm}>
              <DevTool control={control} />
              <ControlledTextField
                control={control}
                name={'username'}
                label={t.profileSettings.userName}
                className={s.field}
              />
              <ControlledTextField
                control={control}
                name={'firstName'}
                label={t.profileSettings.firstName}
                className={s.field}
              />
              <ControlledTextField
                control={control}
                name={'lastName'}
                label={t.profileSettings.lastName}
                className={s.field}
              />
              <ControlledTextField
                control={control}
                name={'dateOfBirthday'}
                label={t.profileSettings.dateOfBirthday}
                className={s.date}
                placeholder="00.00.00"
              />

              <ControlledTextField
                control={control}
                name={'city'}
                label={t.profileSettings.city}
                className={s.field}
              />
              <TextAreaField
                className={s.textArea}
                fullWidth={true}
                label={t.profileSettings.aboutMe}
              />
            </form>
            <CalendarOutline className={s.calendar} />
          </div>
        </div>

        <Button type={'submit'} variant="primary" className={s.saveBtn}>
          {t.profileSettings.saveChanges}
        </Button>
      </div>
    </div>
  )
}
