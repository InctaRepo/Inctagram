import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import GithubIcon from 'public/icon/gitHubIcon.svg'
import GoogleIcon from 'public/icon/googleIcon.svg'
import { FormFields, triggerZodFieldError } from '@/src/shared/helpers/updateZodError'
import { useTranslate } from '@/src/shared/hooks/useTranslate'
import { RouteNames } from 'src/shared/const/routeNames'
import { createSignUpSchema, SignUpFormSchema } from 'src/shared/schemas/signUpSchema'
import { Button } from 'src/shared/ui/button'
import { Card } from 'src/shared/ui/card'
import { ControlledCheckbox, ControlledTextField } from 'src/shared/ui/controlled'
import { Typography } from 'src/shared/ui/typography'
import s from './singUpForm.module.scss'

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
