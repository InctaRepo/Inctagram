import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { UserInfo } from '@/entities/profile/service'
import { AutocompleteInput } from '@/entities/profile/settings/generalInformation/ui/generalInformationForm/autocompleteInput'
import { FormFields, triggerZodFieldError } from '@/shared/helpers/updateZodError'
import { getUsername } from '@/shared/hoc'
import { useAppSelector, useTranslate } from '@/shared/hooks'
import {
  ProfileSettingSchema,
  createProfileSettingSchema,
} from '@/shared/schemas/profileSettingSchema'
import { Button } from '@/ui/button'
import { ControlledDatePicker, ControlledTextArea, ControlledTextField } from '@/ui/controlled'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseISO } from 'date-fns'

import s from '@/entities/profile/settings/generalInformation/ui/generalInformationForm/generalInformationForm.module.scss'

type Props = {
  onSubmitHandler?: (data: ProfileSettingSchema) => void
  userData: UserInfo
}
export const GeneralInformationForm = ({ onSubmitHandler, userData }: Props) => {
  const { t } = useTranslate()
  const userName = useAppSelector(getUsername)
  const {
    control,
    formState: { errors, touchedFields },
    handleSubmit,
    trigger,
  } = useForm<ProfileSettingSchema>({
    defaultValues: {
      aboutMe: userData?.aboutMe || '',
      avatar: userData?.avatar || '',
      city: userData
        ? userData?.city && userData.city + (userData?.country && ',' + userData?.country)
        : '',
      dateOfBirthday: userData?.dateOfBirth ? parseISO(`${userData?.dateOfBirth}`) : new Date(),
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      username: userData ? userData?.username : userName,
    },
    mode: 'onChange',
    resolver: zodResolver(createProfileSettingSchema(t)),
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])
  const submitData = (data: ProfileSettingSchema) => {
    onSubmitHandler?.(data)
  }

  return (
    <>
      <form className={s.editForm} onSubmit={handleSubmit(submitData)}>
        <DevTool control={control} />
        <ControlledTextField
          className={s.field}
          control={control}
          isRequired
          label={t.profileSetting.generalInformation.userName}
          name={'username'}
        />
        <ControlledTextField
          className={s.field}
          control={control}
          isRequired
          label={t.profileSetting.generalInformation.firstName}
          name={'firstName'}
        />
        <ControlledTextField
          className={s.field}
          control={control}
          isRequired
          label={t.profileSetting.generalInformation.lastName}
          name={'lastName'}
        />
        <ControlledDatePicker
          className={s.date}
          control={control}
          errorMessage={errors.dateOfBirthday?.message}
          label={t.profileSetting.generalInformation.dateOfBirthday}
          name={'dateOfBirthday'}
        />

        <div className={s.field}>
          <AutocompleteInput
            control={control}
            inputLabel={t.profileSetting.generalInformation.city}
          />
        </div>

        <ControlledTextArea
          className={s.textArea}
          control={control}
          fullWidth
          label={t.profileSetting.generalInformation.aboutMe}
          name={'aboutMe'}
          placeholder={t.profileSetting.generalInformation.placeholderTextArea}
        />

        <div className={s.saveBtn}>
          <Button fullWidth type={'submit'} variant={'primary'}>
            {t.profileSetting.generalInformation.saveChanges}
          </Button>
        </div>
      </form>
      <div className={`${s.grayLine} ${errors.dateOfBirthday && s.grayLineError}`} />
    </>
  )
}
