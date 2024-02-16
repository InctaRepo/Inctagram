import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { authByGitHub } from '@/features/auth/signIn/authByGitHub/authByGitHub'
import { authByGoogle } from '@/features/auth/signIn/authByGoogle/authByGoogle'
import s from '@/features/auth/signUp/ui/singUpForm/singUpForm.module.scss'
import GithubIcon from '@/public/icon/gitHubIcon.svg'
import GoogleIcon from '@/public/icon/googleIcon.svg'
import { RouteNames } from '@/shared/const'
import { FormFields, triggerZodFieldError } from '@/shared/helpers/updateZodError'
import { useTranslate } from '@/shared/hooks'
import { createSignUpSchema, SignUpFormSchema } from '@/shared/schemas/signUpSchema'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import { ControlledCheckbox, ControlledTextField } from '@/ui/controlled'
import { Typography } from '@/ui/typography'

type Props = {
  onSubmitHandler: (data: SignUpFormSchema) => void
}

export const SingUpForm = ({ onSubmitHandler }: Props) => {
  const { t } = useTranslate()

  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState,
    trigger,
    formState: { touchedFields, errors },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(createSignUpSchema(t)),
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      terms: false,
    },
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t])

  const onSubmit = handleSubmit((data: SignUpFormSchema) => {
    onSubmitHandler(data)
  })

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <Typography variant={'h1'} className={s.title}>
          {t.auth.signUp}
        </Typography>
        <div className={s.authIcons}>
          <div onClick={authByGoogle}>
            <GoogleIcon />
          </div>
          <div onClick={authByGitHub}>
            <GithubIcon />
          </div>
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
                  <Link href={RouteNames.TERMS_OF_USE} className={s.termsLink}>
                    {t.auth.termsOfService}
                  </Link>
                  &nbsp;{t.auth.and}&nbsp;
                  <Link href={RouteNames.PRIVACY_POLICY} className={s.termsLink}>
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
