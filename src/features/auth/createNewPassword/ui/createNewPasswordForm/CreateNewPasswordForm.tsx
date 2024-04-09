import React from 'react'

import { DevTool } from '@hookform/devtools'

import { useCreateNewPasswordForm } from '@/features/auth/createNewPassword/hooks'
import s from '@/features/auth/createNewPassword/ui/createNewPasswordForm/createNewPasswordForm.module.scss'
import { PasswordsMatchForm } from '@/shared/schemas/passwordsMatchSchema'
import { Button } from '@/ui/button'
import { ControlledTextField } from '@/ui/controlled'
import { Typography } from '@/ui/typography'

type Props = {
  onSubmitHandler: (data: PasswordsMatchForm) => void
}

export const CreateNewPasswordForm = (props: Props) => {
  const { t, submit, handleSubmit, control, errors } = useCreateNewPasswordForm(props)

  return (
    <form className={s.wrapper} onSubmit={handleSubmit(submit)}>
      <Typography variant={'h1'}>{t.auth.createNewPassword}</Typography>
      <DevTool control={control} />

      <ControlledTextField
        control={control}
        name={'password'}
        type={'password'}
        label={t.auth.newPassword}
        className={s.password}
        autoComplete="new-password"
      />

      <ControlledTextField
        control={control}
        name={'passwordConfirm'}
        type={'password'}
        label={t.auth.passwordConfirmation}
        className={`${s.password} ${errors.passwordConfirm && s.fieldWithError}`}
        autoComplete="new-password"
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
