import React, { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import s from './passwordRecoveryForm.module.scss'

import { PasswordRecoveryParams } from '@/src/features/auth/passwordRecovery/model/types/passwordRecoveryParams'
import { FormFields, triggerZodFieldError } from '@/src/shared/helpers/updateZodError'
import { useTranslate } from '@/src/shared/hooks'
import { passwordRecoverySchema } from '@/src/shared/schemas/passwordRecoverySchema'
import { Button } from '@/src/shared/ui/button/Button'
import { Card } from '@/src/shared/ui/card'
import { ControlledRecaptcha, ControlledTextField } from '@/src/shared/ui/controlled'
import { ForgotForm } from '@/src/shared/ui/recaptcha'
import { Typography } from '@/src/shared/ui/typography'

type Props = {
  onSubmitHandler: (data: PasswordRecoveryParams) => void
  modalHandler: () => void
}

// css variator
const CSSMod = {
  primary: 'primary',
  secondary: 'secondary',
}

export const PasswordRecoveryForm = ({ onSubmitHandler, modalHandler }: Props) => {
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
    // TODO custom hook with useTranslate ?
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
