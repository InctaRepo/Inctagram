import React from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useTranslate } from '@/src/assets/hooks/useTranslate'
import { passwordsMatchSchema } from '@/src/common/schemas/passwordsMatch-schema'
import styles from '@/src/components/auth/create-new-password/createNewPassword.module.scss'
import { Button } from '@/src/components/ui/button'
import { ControlledTextField } from '@/src/components/ui/controlled'
import { Typography } from '@/src/components/ui/typography'

export type CreateNewPasswordType = z.infer<typeof passwordsMatchSchema>

type CreateNewPasswordPropsType = {
  onSubmitHandler: (data: CreateNewPasswordType) => void
}

export const CreateNewPassword = (props: CreateNewPasswordPropsType) => {
  const { onSubmitHandler } = props
  const { t } = useTranslate()

  const { control, handleSubmit } = useForm<CreateNewPasswordType>({
    resolver: zodResolver(passwordsMatchSchema),
    mode: 'onChange',
  })

  const onSubmit = handleSubmit((data: CreateNewPasswordType) => {
    onSubmitHandler(data)
  })

  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <Typography variant={'h1'}>{t.auth.createNewPassword}</Typography>
      <DevTool control={control} />

      <ControlledTextField
        control={control}
        name={'password'}
        type={'password'}
        label={t.auth.newPassword}
        className={styles.password}
      />

      <ControlledTextField
        control={control}
        name={'passwordConfirmation'}
        type={'password'}
        label={t.auth.passwordConfirmation}
        className={styles.password}
      />
      <div className={styles.text}>
        <Typography variant="medium14" className={styles.passwordRequirement}>
          {t.auth.passwordCharacters}
        </Typography>
      </div>
      <Button type="submit" variant="primary" fullWidth={true} className={styles.btn}>
        <Typography variant="bold16">{t.auth.createNewPassword}</Typography>
      </Button>
    </form>
  )
}
