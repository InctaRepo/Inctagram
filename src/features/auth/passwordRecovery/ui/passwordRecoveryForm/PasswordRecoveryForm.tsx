import React, { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { IForgotPasswordProps } from '../PasswordForgotTypes'

import s from './passwordRecoveryForm.module.scss'

import { FormFields, triggerZodFieldError } from '@/shared/helpers/updateZodError'
import { useTranslate } from '@/shared/hooks'
import { passwordRecoverySchema } from '@/shared/schemas/passwordRecoverySchema'
import { ForgotForm } from '@/shared/ui/recaptcha'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import { ControlledTextField } from '@/ui/controlled'
import { Typography } from '@/ui/typography'

// css variator
const CSSMod = {
  primary: 'primary',
  secondary: 'secondary',
}

const handleRecaptchaError = (error: any) => {
  console.error('Ошибка ReCAPTCHA:', error)
}

export const PasswordRecoveryForm = (props: IForgotPasswordProps) => {
  const [mode, setMode] = useState(CSSMod.primary)
  const { t } = useTranslate()
  const router = useRouter()
  const { siteKey, onChange, recaptchaRef, onSubmitHandler, modalHandler } = props
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
      delete data.recaptcha
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
            onClick={handleSubmit(onSubmitHandler)}
          >
            <Typography variant="bold16">{t.auth.backToSignIn}</Typography>
          </Button>
          <ReCAPTCHA
            sitekey={siteKey}
            onChange={onChange}
            className={s.recaptcha}
            ref={recaptchaRef}
            theme="dark"
            onError={handleRecaptchaError} // Обработчик ошибок ReCAPTCHA
          />
        </form>
      </Card>
    </div>
  )
}
