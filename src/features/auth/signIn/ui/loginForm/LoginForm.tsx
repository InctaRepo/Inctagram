import React from 'react'

import { useLoginForm } from '@/features/auth/signIn/hooks'
import { authByGitHub, authByGoogle } from '@/features/auth/successGoogleGitHub'
import GithubIcon from '@/public/icon/gitHubIcon.svg'
import GoogleIcon from '@/public/icon/googleIcon.svg'
import { RouteNames } from '@/shared/const'
import { LoginFormType } from '@/shared/schemas/createLoginSchema'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import { ControlledTextField } from '@/ui/controlled'
import { Typography } from '@/ui/typography'
import { DevTool } from '@hookform/devtools'
import Link from 'next/link'

import s from '@/features/auth/signIn/ui/loginForm/loginForm.module.scss'

type Props = {
  errorServer?: string
  onSubmitHandler?: (data: LoginFormType) => void
}
export const LoginForm = ({ errorServer, onSubmitHandler }: Props) => {
  const { control, errors, handleSubmit, router, submitData, t } = useLoginForm({
    errorServer,
    onSubmitHandler,
  })

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
