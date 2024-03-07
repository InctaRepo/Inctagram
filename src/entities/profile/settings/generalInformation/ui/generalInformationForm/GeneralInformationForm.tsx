import React, { useEffect } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseISO } from 'date-fns'
import { useForm } from 'react-hook-form'

import { UserInfo } from '@/entities/profile/service'
import { AutocompleteInput } from '@/entities/profile/settings/generalInformation/ui/generalInformationForm/autocompleteInput'
import s from '@/entities/profile/settings/generalInformation/ui/generalInformationForm/generalInformationForm.module.scss'
import { FormFields, triggerZodFieldError } from '@/shared/helpers/updateZodError'
import { getUsername } from '@/shared/hoc'
import { useAppSelector, useTranslate } from '@/shared/hooks'
import {
  createProfileSettingSchema,
  ProfileSettingSchema,
} from '@/shared/schemas/profileSettingSchema'
import { Button } from '@/ui/button'
import { ControlledDatePicker, ControlledTextArea, ControlledTextField } from '@/ui/controlled'

type Props = {
  onSubmitHandler?: (data: ProfileSettingSchema) => void
  userData: UserInfo
}
export const GeneralInformationForm = ({ onSubmitHandler, userData }: Props) => {
  const { t } = useTranslate()
  const userName = useAppSelector(getUsername)
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
  } = useForm<ProfileSettingSchema>({
    resolver: zodResolver(createProfileSettingSchema(t)),
    mode: 'onChange',
    defaultValues: {
      username: userData ? userData?.username : userName,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      dateOfBirthday: userData?.dateOfBirth ? parseISO(`${userData?.dateOfBirth}`) : new Date(),
      city: userData
        ? userData?.city && userData.city + (userData?.country && ',' + userData?.country)
        : '',
      aboutMe: userData?.aboutMe || '',
      avatar: userData?.avatar || '',
    },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t])
  const submitData = (data: ProfileSettingSchema) => {
    onSubmitHandler?.(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitData)} className={s.editForm}>
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
        <ControlledDatePicker
          control={control}
          className={s.date}
          label={t.profileSetting.generalInformation.dateOfBirthday}
          name={'dateOfBirthday'}
          errorMessage={errors.dateOfBirthday?.message}
        />

        <div className={s.field}>
          <AutocompleteInput
            control={control}
            inputLabel={t.profileSetting.generalInformation.city}
          />
        </div>

        <ControlledTextArea
          control={control}
          className={s.textArea}
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
      <div className={`${s.grayLine} ${errors.dateOfBirthday && s.grayLineError}`} />
    </>
  )
}
