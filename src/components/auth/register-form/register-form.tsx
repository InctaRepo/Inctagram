import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import s from './register-form.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import GithubIcon from '@/src/assets/icons/github-icon'
import GoogleIcon from '@/src/assets/icons/google-icon'
import { FormFields, triggerZodFieldError } from '@/src/common/helpers/updateZodError'
import { createRegisterSchema, RegisterFormType } from '@/src/common/schemas/register-schema'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card-temporary'
import { ControlledCheckbox, ControlledTextField } from '@/src/components/ui/controlled'
import { Typography } from '@/src/components/ui/typography'

type RegisterFormPropsType = {
  onSubmitHandler: (data: RegisterFormType) => void
}

export const RegisterForm = ({ onSubmitHandler }: RegisterFormPropsType) => {
  const { t } = useTranslate()

  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState,
    trigger,
    formState: { touchedFields, errors },
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
    // TODO custom hook with useTranslate ?
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t])

  const onSubmit = handleSubmit((data: RegisterFormType) => {
    // TODO after submit error message in field Username:  User with this username is already registered
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
            {/*TODO link oAuth 2.0 backend url*/}
            <GoogleIcon />
          </Link>
          <Link href={'/github'}>
            {/*TODO link oAuth 2.0 backend url*/}
            <GithubIcon />
          </Link>
        </div>
        <form onSubmit={onSubmit} className={s.form}>
          <ControlledTextField
            control={control}
            name={'username'}
            label={t.auth.userName}
            className={`${s.field} ${errors.username && s.fieldWithError}`}
          />
          <ControlledTextField
            control={control}
            name={'email'}
            label={t.auth.email}
            className={`${s.field} ${errors.email && s.fieldWithError}`}
          />
          <ControlledTextField
            control={control}
            name={'password'}
            type={'password'}
            label={t.auth.password}
            className={`${s.field} ${errors.password && s.fieldWithError}`}
          />
          <ControlledTextField
            control={control}
            name={'passwordConfirm'}
            type={'password'}
            label={t.auth.passwordConfirmation}
            className={`${s.field} ${s.lastField}`}
          />
          <div className={s.terms}>
            <ControlledCheckbox
              control={control}
              name={'terms'}
              label={
                <Typography variant={'small'} className={s.termsRow}>
                  {t.auth.agree}&nbsp;
                  <Link href={'/auth/terms-of-use'} className={s.termsLink}>
                    {t.auth.termsOfService}
                  </Link>
                  &nbsp;{t.auth.and}&nbsp;
                  <Link href={'/auth/privacy-policy'} className={s.termsLink}>
                    {t.auth.policy}
                  </Link>
                </Typography>
              }
            />
          </div>
          <Button type="submit" fullWidth className={s.registerBtn} disabled={!formState.isValid}>
            <Typography variant="bold16">{t.auth.signUp}</Typography>
          </Button>
        </form>
        <Typography variant={'regular16'} className={s.subtitle}>
          {t.auth.haveAccount}
        </Typography>
        <Button variant="link" color={'link'} onClick={() => router.push('/')}>
          {t.auth.signIn}
        </Button>
      </div>
    </Card>
  )
}
