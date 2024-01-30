import React, { useEffect } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import s from '@/features/auth/createNewPassword/ui/createNewPasswordForm/createNewPasswordForm.module.scss'
import { FormFields, triggerZodFieldError } from '@/shared/helpers/updateZodError'
import { useTranslate } from '@/shared/hooks'
import { PasswordsMatchForm, passwordsMatchSchema } from '@/shared/schemas/passwordsMatchSchema'
import { Button } from '@/ui/button'
import { ControlledTextField } from '@/ui/controlled'
import { Typography } from '@/ui/typography'

type CreateNewPasswordProps = {
  onSubmitHandler: (data: PasswordsMatchForm) => void
}

export const CreateNewPasswordForm = ({ onSubmitHandler }: CreateNewPasswordProps) => {
  const { t } = useTranslate()

  const {
    control,
    handleSubmit,
    formState,
    trigger,
    formState: { touchedFields, errors },
  } = useForm<PasswordsMatchForm>({
    resolver: zodResolver(passwordsMatchSchema(t)),
    mode: 'onTouched',
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t])

  const onSubmit = handleSubmit((data: PasswordsMatchForm) => {
    onSubmitHandler(data)
  })

  return (
    <form className={s.wrapper} onSubmit={onSubmit}>
      <Typography variant={'h1'}>{t.auth.createNewPassword}</Typography>
      <DevTool control={control} />

      <ControlledTextField
        control={control}
        name={'password'}
        type={'password'}
        label={t.auth.newPassword}
        className={s.password}
      />

      <ControlledTextField
        control={control}
        name={'passwordConfirm'}
        type={'password'}
        label={t.auth.passwordConfirmation}
        className={`${s.password} ${errors.passwordConfirm && s.fieldWithError}`}
      />
      <div className={s.text}>
        <Typography variant="medium14" className={s.passwordRequirement}>
          {t.auth.passwordCharacters}
        </Typography>
      </div>
      <Button type={'submit'} variant="primary" fullWidth={true} className={s.btn}>
        <Typography variant="bold16">{t.auth.createNewPassword}</Typography>
      </Button>
    </form>
  )
}
