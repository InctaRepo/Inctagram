import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import s from './register-form.module.scss'

import { useTranslation } from '@/src/assets/hooks/useTranslation'
import GithubIcon from '@/src/assets/icons/github-icon'
import GoogleIcon from '@/src/assets/icons/google-icon'
import { createRegisterSchema, RegisterFormType } from '@/src/common/schemas/register-schema'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card-temporary'
import { ControlledCheckbox, ControlledTextField } from '@/src/components/ui/controlled'
import { Typography } from '@/src/components/ui/typography'

type RegisterFormPropsType = {
  onSubmitHandler: (data: RegisterFormType) => void
}

export const RegisterForm = ({ onSubmitHandler }: RegisterFormPropsType) => {
  const { t } = useTranslation()

  // z.setErrorMap(makeZodI18nMap({ t }))

  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState,
    trigger,
    formState: { touchedFields },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(createRegisterSchema(t)),
    mode: 'onTouched',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      terms: false,
    },
  })

  useEffect(() => {
    const touchedFieldNames = Object.keys(touchedFields)

    if (touchedFieldNames.length > 0) {
      touchedFieldNames.forEach(fieldName => {
        trigger(fieldName as keyof RegisterFormType)
      })
    }
    // TODO:  Replace this handler , need to rerender errors after changing language.
  }, [t, touchedFields])

  const onSubmit = handleSubmit((data: RegisterFormType) => {
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
            {/*TODO link Oauth2.0*/}
            <GoogleIcon />
          </Link>
          <Link href={'/github'}>
            {/*TODO link Oauth2.0*/}
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
          <Button type={'submit'} fullWidth className={s.registerBtn} disabled={!formState.isValid}>
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
