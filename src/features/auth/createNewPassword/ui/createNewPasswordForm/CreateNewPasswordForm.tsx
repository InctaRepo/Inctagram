import React from 'react'

import { useCreateNewPasswordForm } from '@/features/auth/createNewPassword/hooks'
import { PasswordsMatchForm } from '@/shared/schemas/passwordsMatchSchema'
import { Button } from '@/ui/button'
import { ControlledTextField } from '@/ui/controlled'
import { Typography } from '@/ui/typography'
import { DevTool } from '@hookform/devtools'

import s from '@/features/auth/createNewPassword/ui/createNewPasswordForm/createNewPasswordForm.module.scss'

type Props = {
  onSubmitHandler: (data: PasswordsMatchForm) => void
}

export const CreateNewPasswordForm = (props: Props) => {
  const { control, errors, handleSubmit, submit, t } = useCreateNewPasswordForm(props)

  return (
    <form className={s.wrapper} onSubmit={handleSubmit(submit)}>
      <Typography variant={'h1'}>{t.auth.createNewPassword}</Typography>
      <DevTool control={control} />

      <ControlledTextField
        autoComplete={'new-password'}
        className={s.password}
        control={control}
        label={t.auth.newPassword}
        name={'password'}
        type={'password'}
      />

      <ControlledTextField
        autoComplete={'new-password'}
        className={`${s.password} ${errors.passwordConfirm && s.fieldWithError}`}
        control={control}
        label={t.auth.passwordConfirmation}
        name={'passwordConfirm'}
        type={'password'}
      />
      <div className={s.text}>
        <Typography className={s.passwordRequirement} variant={'medium14'}>
          {t.auth.passwordCharacters}
        </Typography>
      </div>
      <Button className={s.btn} fullWidth type={'submit'} variant={'primary'}>
        <Typography variant={'bold16'}>{t.auth.createNewPassword}</Typography>
      </Button>
    </form>
  )
}
