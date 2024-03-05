import React, { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { RecoveryParams } from '@/features/auth/recovery/service/types/recoveryParams'
import s from '@/features/auth/recovery/ui/recoveryForm/recoveryForm.module.scss'
import { RouteNames } from '@/shared/const'
import { FormFields, triggerZodFieldError } from '@/shared/helpers/updateZodError'
import { useTranslate } from '@/shared/hooks'
import { passwordRecoverySchema } from '@/shared/schemas/passwordRecoverySchema'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import { ControlledRecaptcha, ControlledTextField } from '@/ui/controlled'
import { ForgotForm } from '@/ui/recaptcha'
import { Typography } from '@/ui/typography'

type Props = {
  onSubmitHandler: (data: RecoveryParams) => void
  modalHandler: () => void
  type: 'email' | 'password'
}

// css variator
const CSSMod = {
  primary: 'primary',
  secondary: 'secondary',
}

export const RecoveryForm = ({ onSubmitHandler, modalHandler, type }: Props) => {
  const [mode, setMode] = useState(CSSMod.primary)
  const { t } = useTranslate()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    trigger,
    formState: { touchedFields, errors },
  } = useForm<ForgotForm>({
    resolver: zodResolver(passwordRecoverySchema(t)),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      recaptcha: false,
    },
  })

  useEffect(() => {
    triggerZodFieldError(Object.keys(touchedFields) as FormFields[], trigger)
  }, [t])

  const submitData = (data: ForgotForm) => {
    setMode(CSSMod.secondary)
    if (data && data.recaptcha) {
      // @ts-ignore
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
          {type === 'password' && t.auth.forgotPasswordTitle}
          {type === 'email' && t.auth.resendVerificationLinkTitle}
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
            onClick={() => router.push(RouteNames.SIGN_IN)}
          >
            <Typography variant="bold16">{t.auth.backToSignIn}</Typography>
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
