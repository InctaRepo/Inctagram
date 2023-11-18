import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import GithubIcon from '@/src/assets/icons/github-icon'
import GoogleIcon from '@/src/assets/icons/google-icon'
import { FormFields, triggerZodFieldError } from '@/src/shared/helpers/updateZodError'
import { useTranslate } from '@/src/shared/hooks/useTranslate'
import { createLoginSchema, LoginFormType } from '@/src/shared/schemas/create-login-schema'
import { Card } from '@/src/shared/ui/card'
import { RouteNames } from 'src/shared/const/routeNames'
import { Button } from 'src/shared/ui/button'
import { ControlledTextField } from 'src/shared/ui/controlled'
import { Typography } from 'src/shared/ui/typography'
import s from './loginForm.module.scss'

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
    // TODO:  it works ! but need to replace this handler (not a good one)
  }, [t])

  useEffect(() => {
    setError('password', { type: 'custom', message: errorServer })
    setError('email', { type: 'custom', message: errorServer })
  }, [errorServer, onSubmitHandler])

  const submitData = (data: LoginFormType) => {
    //TODO errors from backend after submit : (1)This email address is not registered. Please register ;
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
            label={t.auth.email}
            className={`${s.field} ${errors.email && s.fieldWithError && errorServer}`}
            fullWidth
          />

          <ControlledTextField
            control={control}
            name="password"
            label={t.auth.password}
            type="password"
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
