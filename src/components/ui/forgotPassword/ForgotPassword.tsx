import React, { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

import { passwordRecoverySchema } from '@/src/common/schemas/password-recovery-schema'
import { alertToast } from '@/src/components/ui/alert'
import { Button } from '@/src/components/ui/button/button'
import { Card } from '@/src/components/ui/card-temporary'
import { ControlledTextField } from '@/src/components/ui/controlled'
import { Recaptcha } from '@/src/components/ui/recaptcha/Recaptcha'
import { Typography } from '@/src/components/ui/typography/typography'

type PropsType = {}

type FormDataType = z.infer<typeof passwordRecoverySchema>

export const ForgotPassword: React.FC<PropsType> = () => {
  const [mode, setMode] = useState('mode--primary')
  const [recaptchaVal, setRecaptchaVal] = useState(false)
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
  }

  return (
    <div className={s[mode]}>
      <Card className={s.main}>
        <Typography variant="h1" className={s.title}>
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit(submitData)} className={s.form}>
          <ControlledTextField
            control={control}
            name="email"
            label="Email"
            placeholder="Epam@epam.com"
            className={s.email}
          />
          <Typography
            variant="regular14"
            className={`${s.hint} ${errors.email ? s.emailError : ''}`}
          >
            Enter your email address and we will send you further instructions
          </Typography>
          <Button variant="primary" className={s.submit}>
            <Typography variant="h3">Send Link</Typography>
          </Button>
          <Typography variant="regular14" className={s.answer}>
            The link has been sent by email.
            <br />
            If you don’t receive an email send link again
          </Typography>
          <Button variant="primary" className={s.repeat}>
            <Typography variant="h3">Send Link Again</Typography>
          </Button>
          <Button
            variant="text"
            className={`${s.back} ${s.cancel}`}
            onClick={() => router.push('/')}
          >
            <Typography variant="h3">Back to Sign</Typography>
          </Button>
          <Recaptcha
            // control={control}
            // name="recaptcha"
            // value={recaptchaVal}
            primary
            className={s.recaptcha}
            setRecaptchaVal={setRecaptchaVal}
          />
        </form>
      </Card>
    </div>
  )
}
