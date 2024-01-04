import React, { FC, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import s from '@/src/features/auth/signIn/ui/loginForm/loginForm.module.scss'
import { RouteNames } from '@/src/shared/const'
import { FormFields, triggerZodFieldError } from '@/src/shared/helpers/updateZodError'
import { useTranslate } from '@/src/shared/hooks'
import { createLoginSchema, LoginFormType } from '@/src/shared/schemas/createLoginSchema'
import { Button } from '@/src/shared/ui/button'
import { Card } from '@/src/shared/ui/card'
import { ControlledTextField } from '@/src/shared/ui/controlled'
import { Typography } from '@/src/shared/ui/typography'
import GithubIcon from 'public/icon/gitHubIcon.svg'
import GoogleIcon from 'public/icon/googleIcon.svg'

type LoginType = {
  onSubmitHandler?: (data: LoginFormType) => void
  errorServer?: string
}
export const LoginForm: FC<LoginType> = ({ onSubmitHandler, errorServer }) => {
  const { t } = useTranslate()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    trigger,
    setError,
    formState: { touchedFields, errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(createLoginSchema(t)),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t])

  useEffect(() => {
    setError('password', { type: 'custom', message: errorServer })
    setError('email', { type: 'custom', message: errorServer })
  }, [errorServer, onSubmitHandler])

  const submitData = (data: LoginFormType) => {
    onSubmitHandler?.(data)
  }

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <Typography variant="h1" className={s.title}>
          {t.auth.signIn}
        </Typography>
        <div className={s.oauthWrap}>
          <Link href={'/google'}>
            <GoogleIcon />
          </Link>
          <Link href={'/github'}>
            <GithubIcon />
          </Link>
        </div>
        <form onSubmit={handleSubmit(submitData)} className={s.form}>
          <ControlledTextField
            control={control}
            name="email"
            autoComplete="username"
            label={t.auth.email}
            className={`${s.field} ${errors.email && s.fieldWithError && errorServer}`}
            fullWidth
          />

          <ControlledTextField
            control={control}
            name="password"
            label={t.auth.password}
            type="password"
            autoComplete="current-password"
            className={`${s.passField} ${errors.password && s.fieldWithError && errorServer}`}
            fullWidth
          />
          <div className={s.wrapLinkForgotPass}>
            <Link href={RouteNames.PASSWORD_RECOVERY} className={s.link}>
              <Typography variant="medium14" className={s.linkForgotPass}>
                {t.auth.forgotPassword}
              </Typography>
            </Link>
          </div>
          <Button type="submit" variant="primary" fullWidth className={s.singIn}>
            <Typography variant="bold16">{t.auth.signIn}</Typography>
          </Button>
        </form>

        <Typography variant="regular16">{t.auth.dontHaveAccount}</Typography>
        <Button variant="link" color={'link'} onClick={() => router.push(RouteNames.SIGN_UP)}>
          {t.auth.signUp}
        </Button>
      </div>
    </Card>
  )
}
