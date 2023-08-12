import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'
import { ControlledTextField } from '../../ui/controlled'
import { Typography } from '../../ui/typography'

import s from './login-form.module.scss'

import GithubIcon from '@/src/assets/icons/github-icon'
import GoogleIcon from '@/src/assets/icons/google-icon'
import { logInSchema } from '@/src/common/schemas/logIn-schema'

type FormDataType = z.infer<typeof logInSchema>

export const LogInform: React.FC = () => {
  const { control, handleSubmit } = useForm<FormDataType>({
    resolver: zodResolver(logInSchema),
  })
  const router = useRouter()

  const submitData = (data: FormDataType) => {
    alert(JSON.stringify(data))
  }

  return (
    <form onSubmit={handleSubmit(submitData)} className={s.divWrap}>
      <Typography variant="h1">Sing In</Typography>
      <div className={s.oauthWrap}>
        <Link href={'/google'}>
          <GoogleIcon />
        </Link>
        <Link href={'/github'}>
          <GithubIcon />
        </Link>
      </div>
      <ControlledTextField
        control={control}
        name="email"
        label="Email"
        className={s.controlTextField}
        fullWidth
      />

      <ControlledTextField
        control={control}
        name="password"
        label="Password"
        className={s.controlTextField}
        fullWidth
      />
      <div className={s.wrapLinkForgotPass}>
        <Button variant="text" onClick={() => router.push('/auth/forgotPassword')}>
          <Typography variant="medium14" className={s.linkForgotPass}>
            Forgot Password
          </Typography>
        </Button>
      </div>
      <Button type="submit" variant="primary" fullWidth={true}>
        <Typography variant="bold16">Sing In</Typography>
      </Button>
      <Typography variant="regular16">Don’t have an account?</Typography>
      <Button variant="link" onClick={() => router.push('/auth/sign-up')}>
        <Typography variant="regular16" className={s.linkSingUP}>
          Sing Up
        </Typography>
      </Button>
    </form>
  )
}
