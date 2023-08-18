import React from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { passwordsMatchSchema } from '@/src/common/schemas/passwordsMatch-schema'
import { Button } from '@/src/components/ui/button'
import { ControlledTextField } from '@/src/components/ui/controlled'
import styles from '@/src/components/ui/createNewPassword/createNewPassword.module.scss'
import { Typography } from '@/src/components/ui/typography'

export type CreateNewPasswordType = z.infer<typeof passwordsMatchSchema>

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
      <Typography variant={'h1'}>Create New Password</Typography>
      <DevTool control={control} />

      <ControlledTextField
        control={control}
        name={'password'}
        type={'password'}
        label={'New password'}
        className={styles.password}
        placeholder={'******************'}
      />

      <ControlledTextField
        control={control}
        name={'passwordConfirmation'}
        type={'password'}
        label={'Password confirmation'}
        className={styles.password}
        placeholder={'******************'}
      />

      <Typography variant="medium14" className={styles.passwordRequirement}>
        Your password must be between 6 and 20 <br />
        characters
      </Typography>

      <Button type="submit" variant="primary" fullWidth={true} className={styles.btn}>
        <Typography variant="bold16">Create new password</Typography>
      </Button>
    </form>
  )
}
export default CreateNewPassword
