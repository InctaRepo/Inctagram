import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './register-form.module.scss'

import { useTranslation } from '@/src/assets/hooks/useTranslation'
import GithubIcon from '@/src/assets/icons/github-icon'
import GoogleIcon from '@/src/assets/icons/google-icon'
import { registerSchema } from '@/src/common/schemas/register-schema'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card-temporary'
import { ControlledCheckbox, ControlledTextField } from '@/src/components/ui/controlled'
import { Typography } from '@/src/components/ui/typography'

export type RegisterFormType = z.infer<typeof registerSchema>

type RegisterFormPropsType = {
  onSubmitHandler: (data: RegisterFormType) => void
}

export const RegisterForm = ({ onSubmitHandler }: RegisterFormPropsType) => {
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    const userDataFromLS = localStorage.getItem('userData')

    if (userDataFromLS) {
      const userData: RegisterFormType = JSON.parse(userDataFromLS)

      setValue('username', userData.username)
      setValue('email', userData.email)
      setValue('password', userData.password)
      setValue('passwordConfirm', userData.passwordConfirm)
      // TODO saving to localstorage not secure , another method or save only name && mail
    }
  }, [])

  const { control, handleSubmit, setValue } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: {
      terms: true,
    },
  })

  const onSubmit = handleSubmit((data: RegisterFormType) => {
    localStorage.setItem('userData', JSON.stringify(data))
    onSubmitHandler(data)
  })

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <Typography variant={'h1'} className={s.title}>
          {t.auth.signUp}
        </Typography>
        <div className={s.authIcons}>
          <Link href={'/google'}>
            {/*TODO link*/}
            <GoogleIcon />
          </Link>
          <Link href={'/github'}>
            {/*TODO link*/}
            <GithubIcon />
          </Link>
        </div>
        <form onSubmit={onSubmit} className={s.form}>
          <ControlledTextField
            control={control}
            name={'username'}
            label={t.auth.userName}
            className={s.field}
          />
          <ControlledTextField
            control={control}
            name={'email'}
            label={t.auth.email}
            className={s.field}
          />
          <ControlledTextField
            control={control}
            name={'password'}
            type={'password'}
            label={t.auth.password}
            className={s.field}
          />
          <ControlledTextField
            control={control}
            name={'passwordConfirm'}
            type={'password'}
            label={t.auth.passwordConfirmation}
            className={s.field}
          />
          {/*<Trans*/}
          {/*  text={t.auth.signUpTerms.description}*/}
          {/*  tags={{*/}
          {/*    1: () => <b>{'fdfdf'}</b>,*/}
          {/*    2: () => <b>{'fdfdf'}</b>,*/}
          {/*  }}*/}
          {/*/>*/}
          <div className={s.terms}>
            <ControlledCheckbox
              control={control}
              name={'terms'}
              label={
                <Typography variant={'small'} className={s.termsRow}>
                  {t.auth.agree}&nbsp;
                  <Link href={'/terms'} className={s.termsLink}>
                    {t.auth.termsOfService}
                  </Link>
                  &nbsp;{t.auth.and}&nbsp;
                  <Link href={'/policy'} className={s.termsLink}>
                    {t.auth.policy}
                  </Link>
                </Typography>
              }
            />
          </div>
          <Button
            type={'submit'}
            fullWidth
            className={s.registerBtn}
            // disabled={!formState.isValid}
            //TODO disable
          >
            <Typography variant={'h3'}>{t.auth.signUp}</Typography>
          </Button>
        </form>
        <Typography variant={'regular16'} className={s.subtitle}>
          {t.auth.haveAccount}
        </Typography>
        <Button as={'a'} variant={'text'} onClick={() => router.push('/')}>
          {t.auth.signIn}
        </Button>
      </div>
    </Card>
  )
}
