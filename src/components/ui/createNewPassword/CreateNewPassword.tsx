import React from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTranslation } from '@/src/assets/hooks/useTranslation'
import { passwordsMatchSchema } from '@/src/common/schemas/passwordsMatch-schema'
import { Button } from '@/src/components/ui/button'
import { ControlledTextField } from '@/src/components/ui/controlled'
import styles from '@/src/components/ui/createNewPassword/createNewPassword.module.scss'
import { Typography } from '@/src/components/ui/typography'

export type CreateNewPasswordType = z.infer<typeof passwordsMatchSchema>

const { t } = useTranslation()

type CreateNewPasswordPropsType = {
  onSubmitHandler: (data: CreateNewPasswordType) => void
}

export const CreateNewPassword = (props: CreateNewPasswordPropsType) => {
  const { onSubmitHandler } = props

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
        placeholder={'******************'}
      />

      <ControlledTextField
        control={control}
        name={'passwordConfirmation'}
        type={'password'}
        label={t.auth.passwordConfirmation}
        className={styles.password}
        placeholder={'******************'}
      />

      <Typography variant="medium14" className={styles.passwordRequirement}>
        {t.auth.passwordCharacters}
      </Typography>

      <Button type="submit" variant="primary" fullWidth={true} className={styles.btn}>
        <Typography variant="bold16">{t.auth.createNewPassword}</Typography>
      </Button>
    </form>
  )
}
export default CreateNewPassword
