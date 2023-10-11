import React, { FC, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import GoogleLogin from 'react-google-login'
import { useForm } from 'react-hook-form'

import { Button } from '../../ui/button'
import { ControlledTextField } from '../../ui/controlled'
import { Typography } from '../../ui/typography'

import s from './login-form.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import GithubIcon from '@/src/assets/icons/github-icon'
import GoogleIcon from '@/src/assets/icons/google-icon'
import { FormFields, triggerZodFieldError } from '@/src/common/helpers/updateZodError'
import { createLoginSchema, LoginFormType } from '@/src/common/schemas/create-login-schema'
import { Card } from '@/src/components/ui/card-temporary'

type LoginType = {
  onSubmitHandler: (data: LoginFormType) => void
}
export const LoginForm: FC<LoginType> = ({ onSubmitHandler }) => {
  const { t } = useTranslate()
  const login = () => {
    const CLIENT_ID = '645207642523-2he3ueh6ops35dflekhvorlrngg816hg.apps.googleusercontent.com'
    const REDIRECT_URL = 'https://inctagram.space/profile/my-profile'
    const url = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${REDIRECT_URL}&response_type=permission%20id_token&scope=email%20profile%20openid&openid.realm=&include_granted_scopes=true&client_id=${CLIENT_ID}&ss_domain=http%3A%2F%2Flocalhost%3A3000&prompt=&fetch_basic_profile=true&gsiwebsdk=2`

    window.location.assign(url)
  }
  const router = useRouter()

  const {
    control,
    handleSubmit,
    trigger,
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

  const submitData = (data: LoginFormType) => {
    //TODO errors from backend after submit : (1)This email address is not registered. Please register ; (2)The password is incorrect. Try again please
    onSubmitHandler(data)
  }

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <Typography variant="h1" className={s.title}>
          {t.auth.signIn}
        </Typography>
        <div className={s.oauthWrap}>
          <GoogleIcon onClick={login} />
          <Link href={'/github'}>
            <GithubIcon />
          </Link>
        </div>
        <form onSubmit={handleSubmit(submitData)} className={s.form}>
          <ControlledTextField
            control={control}
            name="email"
            label={t.auth.email}
            className={`${s.field} ${errors.email && s.fieldWithError}`}
            fullWidth
          />

          <ControlledTextField
            control={control}
            name="password"
            label={t.auth.password}
            type="password"
            className={s.passField}
            fullWidth
          />
          <div className={s.wrapLinkForgotPass}>
            <Link href={'/auth/forgot-password'} className={s.link}>
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
        <Button variant="link" color={'link'} onClick={() => router.push('/auth/sign-up')}>
          {t.auth.signUp}
        </Button>
      </div>
    </Card>
  )
}
