import React, { FC, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

import { PasswordRecoveryType } from '@/src/assets/api/auth'
import { useTranslation } from '@/src/assets/hooks/useTranslation'
import { passwordRecoverySchema } from '@/src/common/schemas/password-recovery-schema'
import { alertToast } from '@/src/components/ui/alert'
import { Button } from '@/src/components/ui/button/button'
import { Card } from '@/src/components/ui/card-temporary'
import { ControlledTextField } from '@/src/components/ui/controlled'
import { Recaptcha } from '@/src/components/ui/recaptcha/Recaptcha'
import { Typography } from '@/src/components/ui/typography/typography'

type PropsType = {
  onSubmitHandler: (data: PasswordRecoveryType) => void
}

type FormDataType = z.infer<typeof passwordRecoverySchema>

export const ForgotPassword: FC<PropsType> = ({ onSubmitHandler }) => {
  const [mode, setMode] = useState('mode--primary')
  // const [recaptchaVal, setRecaptchaVal] = useState(false)
  const { t } = useTranslation()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(passwordRecoverySchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      recaptcha: true, // requires update
    },
  })

  const submitData = (data: FormDataType) => {
    alertToast(false, JSON.stringify(data))
    setMode('mode--secondary')
    onSubmitHandler(data)
  }

  const classNames = {
    hintClass: clsx(s.hint, errors.email && s.emailError),
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
          <Typography variant="regular14" className={classNames.hintClass}>
            {t.auth.instructions}
          </Typography>
          <Button variant="primary" className={s.submit}>
            <Typography variant="h3">{t.auth.sendLink}</Typography>
          </Button>
          <Typography variant="regular14" className={s.answer}>
            {t.auth.linkHasBeenSent}
          </Typography>
          <Button variant="primary" className={s.repeat}>
            <Typography variant="h3">{t.auth.sendLinkAgain}</Typography>
          </Button>
          <Button variant="text" className={s.back} onClick={() => router.push('/')}>
            <Typography variant="h3">{t.auth.backToSignIn}</Typography>
          </Button>
          <Recaptcha
            // control={control} // в курсе что так не работает, это временно,
            // name="recaptcha" //  будет дорабатываться компонента Recaptcha
            // value={recaptchaVal}
            primary
            className={s.recaptcha}
            // setRecaptchaVal={setRecaptchaVal}
          />
        </form>
      </Card>
    </div>
  )
}
