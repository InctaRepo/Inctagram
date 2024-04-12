import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { authByGitHub, authByGoogle } from '@/features/auth/successGoogleGitHub'
import GithubIcon from '@/public/icon/gitHubIcon.svg'
import GoogleIcon from '@/public/icon/googleIcon.svg'
import { RouteNames } from '@/shared/const'
import { FormFields, triggerZodFieldError } from '@/shared/helpers/updateZodError'
import { useTranslate } from '@/shared/hooks'
import { LoginFormType, createLoginSchema } from '@/shared/schemas/createLoginSchema'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import { ControlledTextField } from '@/ui/controlled'
import { Typography } from '@/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from '@/features/auth/signIn/ui/loginForm/loginForm.module.scss'

type Props = {
  errorServer?: string
  onSubmitHandler?: (data: LoginFormType) => void
}
export const LoginForm = ({ errorServer, onSubmitHandler }: Props) => {
  const { t } = useTranslate()
  const router = useRouter()

  const {
    control,
    formState: { errors, touchedFields },
    handleSubmit,
    setError,
    trigger,
  } = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(createLoginSchema(t)),
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])

  useEffect(() => {
    setError('password', { message: errorServer, type: 'custom' })
    setError('email', { message: errorServer, type: 'custom' })
  }, [errorServer, onSubmitHandler, setError])

  const submitData = (data: LoginFormType) => {
    onSubmitHandler?.(data)
  }

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <Typography className={s.title} variant={'h1'}>
          {t.auth.signIn}
        </Typography>
        <div className={s.oauthWrap}>
          <div onClick={authByGoogle}>
            <GoogleIcon />
          </div>
          <div onClick={authByGitHub}>
            <GithubIcon />
          </div>
        </div>
        <form className={s.form} onSubmit={handleSubmit(submitData)}>
          <DevTool control={control} />
          <ControlledTextField
            autoComplete={'username'}
            className={`${s.field} ${errors.email && s.fieldWithError && errorServer}`}
            control={control}
            fullWidth
            label={t.auth.email}
            name={'email'}
          />

          <ControlledTextField
            autoComplete={'current-password'}
            className={`${s.passField} ${errors.password && s.fieldWithError && errorServer}`}
            control={control}
            fullWidth
            label={t.auth.password}
            name={'password'}
            type={'password'}
          />
          <div className={s.wrapLinkForgotPass}>
            <Link className={s.link} href={RouteNames.PASSWORD_RECOVERY}>
              <Typography className={s.linkForgotPass} variant={'medium14'}>
                {t.auth.forgotPassword}
              </Typography>
            </Link>
          </div>
          <Button className={s.singIn} fullWidth type={'submit'} variant={'primary'}>
            <Typography variant={'bold16'}>{t.auth.signIn}</Typography>
          </Button>
        </form>

        <Typography variant={'regular16'}>{t.auth.dontHaveAccount}</Typography>
        <Button color={'link'} onClick={() => router.push(RouteNames.SIGN_UP)} variant={'link'}>
          {t.auth.signUp}
        </Button>
      </div>
    </Card>
  )
}
