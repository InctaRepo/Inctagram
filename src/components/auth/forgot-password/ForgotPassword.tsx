import React, { FC, useState, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import s from './forgotPassword.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { FormFields, triggerZodFieldError } from '@/src/common/helpers/updateZodError'
import { passwordRecoverySchema } from '@/src/common/schemas/password-recovery-schema'
import { Button } from '@/src/components/ui/button/button'
import { Card } from '@/src/components/ui/card-temporary'
import { ControlledTextField } from '@/src/components/ui/controlled'
import { ControlledRecaptcha } from '@/src/components/ui/controlled/controlled-recaptcha'
import { Typography } from '@/src/components/ui/typography/typography'
import { PasswordRecoveryType } from '@/src/services/auth/auth-api-types'

type PropsType = {
  onSubmitHandler: (data: PasswordRecoveryType) => void
  modalHandler: () => void
}
export type ForgotFormType = {
  email: string
  recaptcha: boolean
}

// css variator
const CSSMod = {
  primary: 'primary',
  secondary: 'secondary',
}

export const ForgotPassword: FC<PropsType> = ({ onSubmitHandler, modalHandler }) => {
  const [mode, setMode] = useState(CSSMod.primary)
  const { t } = useTranslate()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    trigger,
    formState: { touchedFields, errors },
  } = useForm<ForgotFormType>({
    resolver: zodResolver(passwordRecoverySchema(t)),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      recaptcha: false,
    },
  })

  useEffect(() => {
    // TODO custom hook with useTranslate ?
    triggerZodFieldError(Object.keys(touchedFields) as FormFields[], trigger)
  }, [t])

  const submitData = (data: ForgotFormType) => {
    setMode(CSSMod.secondary)
    if (data && data.recaptcha) {
      delete data.recaptcha // our server doesnt receive it yet
    }
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
            <Typography variant="regular16">{t.auth.sendLinkAgain}</Typography>
          </Button>
          <Button
            variant="link"
            color={'$color-accent-500'}
            className={s.back}
            type="button"
            onClick={() => router.push('/')}
          >
            <Typography variant="bold16">{t.auth.BackToSignUp}</Typography>
          </Button>
          <ControlledRecaptcha
            control={control}
            name="recaptcha"
            error={errors?.recaptcha?.message}
            className={s.recaptcha}
            primary
          />
        </form>
      </Card>
    </div>
  )
}
