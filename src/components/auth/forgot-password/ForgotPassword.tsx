import React, { FC, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

import { PasswordRecoveryType } from '@/src/assets/api/types'
import { useTranslate } from '@/src/assets/hooks/useTranslate'
import { passwordRecoverySchema } from '@/src/common/schemas/password-recovery-schema'
import { Button } from '@/src/components/ui/button/button'
import { Card } from '@/src/components/ui/card-temporary'
import { ControlledTextField } from '@/src/components/ui/controlled'
import { ControlledRecaptcha } from '@/src/components/ui/controlled/controlled-recaptcha'
import { Typography } from '@/src/components/ui/typography/typography'

type PropsType = {
  onSubmitHandler: (data: PasswordRecoveryType) => void
  modalHandler: () => void
}

type FormDataType = z.infer<typeof passwordRecoverySchema>

export const ForgotPassword: FC<PropsType> = ({ onSubmitHandler, modalHandler }) => {
  const [mode, setMode] = useState('mode--primary')
  const { t } = useTranslate()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(passwordRecoverySchema(t)),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      recaptcha: false, // requires update
    },
  })

  const submitData = (data: FormDataType) => {
    setMode('mode--secondary')
    onSubmitHandler(data)
    modalHandler()
  }

  const classNames = {
    hint: clsx(s.hint, errors.email && s.emailError),
  }

  return (
    <div className={s[mode]}>
      <Card className={s.main}>
        <Typography variant="h1" className={s.title}>
          {t.auth.forgotPasswordTitle}
        </Typography>
        <form onSubmit={handleSubmit(submitData)} className={s.form}>
          <ControlledTextField
            control={control}
            name="email"
            label={t.auth.email}
            placeholder="Epam@epam.com"
            className={s.email}
          />
          <Typography variant="regular14" className={classNames.hint}>
            {t.auth.instructions}
          </Typography>
          <Button variant="primary" className={s.submit} type="submit">
            <Typography variant="h3">{t.auth.sendLink}</Typography>
          </Button>
          <Typography variant="regular14" className={s.answer}>
            {t.auth.linkHasBeenSent}
          </Typography>
          <Button variant="primary" className={s.repeat} type="submit">
            <Typography variant="h3">{t.auth.sendLinkAgain}</Typography>
          </Button>
          <Button
            variant="link"
            color={'link'}
            className={s.back}
            type="button"
            onClick={() => router.push('/')}
          >
            <Typography variant="h3">{t.auth.backToSignIn}</Typography>
          </Button>
          <ControlledRecaptcha
            control={control}
            name="recaptcha"
            errors={errors}
            className={s.recaptcha}
            primary
          />
        </form>
      </Card>
    </div>
  )
}
