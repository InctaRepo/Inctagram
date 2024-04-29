import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { authByGitHub, authByGoogle } from '@/features/auth/successGoogleGitHub'
import GithubIcon from '@/public/icon/gitHubIcon.svg'
import GoogleIcon from '@/public/icon/googleIcon.svg'
import { RouteNames } from '@/shared/const'
import { FormFields, triggerZodFieldError } from '@/shared/helpers/updateZodError'
import { useTranslate } from '@/shared/hooks'
import { SignUpFormSchema, createSignUpSchema } from '@/shared/schemas/signUpSchema'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import { ControlledCheckbox, ControlledTextField } from '@/ui/controlled'
import { Typography } from '@/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from '@/features/auth/signUp/ui/singUpForm/singUpForm.module.scss'

type Props = {
  onSubmitHandler: (data: SignUpFormSchema) => void
}

export const SingUpForm = ({ onSubmitHandler }: Props) => {
  const { t } = useTranslate()

  const router = useRouter()

  const {
    control,
    formState,
    formState: { errors, touchedFields },
    handleSubmit,
    trigger,
  } = useForm<SignUpFormSchema>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      terms: false,
      username: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(createSignUpSchema(t)),
  })

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const onSubmit = handleSubmit((data: SignUpFormSchema) => {
    onSubmitHandler(data)
  })

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <Typography className={s.title} variant={'h1'}>
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
        <form className={s.form} onSubmit={onSubmit}>
          <ControlledTextField
            className={`${s.field} ${errors.username && s.fieldWithError}`}
            control={control}
            label={t.auth.userName}
            name={'username'}
          />
          <ControlledTextField
            className={`${s.field} ${errors.email && s.fieldWithError}`}
            control={control}
            label={t.auth.email}
            name={'email'}
            type={'email'}
          />
          <ControlledTextField
            className={`${s.field} ${errors.password && s.fieldWithError}`}
            control={control}
            label={t.auth.password}
            name={'password'}
            type={'password'}
          />
          <ControlledTextField
            className={`${s.field} ${s.lastField}`}
            control={control}
            label={t.auth.passwordConfirmation}
            name={'passwordConfirm'}
            type={'password'}
          />
          <div className={s.terms}>
            <ControlledCheckbox
              control={control}
              label={
                <Typography className={s.termsRow} variant={'small'}>
                  {t.auth.agree}&nbsp;
                  <Link className={s.termsLink} href={RouteNames.TERMS_OF_USE}>
                    {t.auth.termsOfService}
                  </Link>
                  &nbsp;{t.auth.and}&nbsp;
                  <Link className={s.termsLink} href={RouteNames.PRIVACY_POLICY}>
                    {t.auth.policy}
                  </Link>
                </Typography>
              }
              name={'terms'}
            />
          </div>
          <Button className={s.registerBtn} disabled={!formState.isValid} fullWidth type={'submit'}>
            <Typography variant={'bold16'}>{t.auth.signUp}</Typography>
          </Button>
        </form>
        <Typography className={s.subtitle} variant={'regular16'}>
          {t.auth.haveAccount}
        </Typography>
        <Button color={'link'} onClick={() => router.push(RouteNames.SIGN_IN)} variant={'link'}>
          {t.auth.signIn}
        </Button>
      </div>
    </Card>
  )
}
