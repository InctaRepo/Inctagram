import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { RecoveryParams } from '@/features/auth/recovery/service/types/recoveryParams'
import { RouteNames } from '@/shared/const'
import { FormFields, triggerZodFieldError } from '@/shared/helpers/updateZodError'
import { useTranslate } from '@/shared/hooks'
import { passwordRecoverySchema } from '@/shared/schemas/passwordRecoverySchema'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import { ControlledRecaptcha, ControlledTextField } from '@/ui/controlled'
import { ForgotForm } from '@/ui/recaptcha'
import { Typography } from '@/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from '@/features/auth/recovery/ui/recoveryForm/recoveryForm.module.scss'

type Props = {
  modalHandler: () => void
  onSubmitHandler: (data: RecoveryParams) => void
  type: 'email' | 'password'
}

// css variator
const CSSMod = {
  primary: 'primary',
  secondary: 'secondary',
}

export const RecoveryForm = ({ modalHandler, onSubmitHandler, type }: Props) => {
  const [mode, setMode] = useState(CSSMod.primary)
  const { t } = useTranslate()
  const router = useRouter()
  const {
    control,
    formState: { errors, touchedFields },
    handleSubmit,
    trigger,
  } = useForm<ForgotForm>({
    defaultValues: {
      email: '',
      recaptcha: false,
    },
    mode: 'onTouched',
    resolver: zodResolver(passwordRecoverySchema(t)),
  })

  useEffect(() => {
    triggerZodFieldError(Object.keys(touchedFields) as FormFields[], trigger)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const submitData = (data: ForgotForm) => {
    setMode(CSSMod.secondary)
    if (data && data.recaptcha) {
      // @ts-ignore
      delete data.recaptcha // our server doesnt receive it yet
    }
    onSubmitHandler(data)
    modalHandler()
  }

  const classNames = {
    hint: clsx(s.hint, errors.email && s.emailError),
  }

  return (
    <div className={s[mode]}>
      <Card className={s.main}>
        <Typography className={s.title} variant={'h1'}>
          {type === 'password' && t.auth.forgotPasswordTitle}
          {type === 'email' && t.auth.resendVerificationLinkTitle}
        </Typography>
        <form className={s.form} onSubmit={handleSubmit(submitData)}>
          <ControlledTextField
            className={s.email}
            control={control}
            label={t.auth.email}
            name={'email'}
            placeholder={'Epam@epam.com'}
            type={'email'}
          />
          <Typography className={classNames.hint} variant={'regular14'}>
            {t.auth.instructions}
          </Typography>
          <Button className={s.submit} type={'submit'} variant={'primary'}>
            <Typography variant={'h3'}>{t.auth.sendLink}</Typography>
          </Button>
          <Typography className={s.answer} variant={'regular14'}>
            {t.auth.linkHasBeenSent}
          </Typography>
          <Button className={s.repeat} type={'submit'} variant={'primary'}>
            <Typography variant={'regular16'}>{t.auth.sendLinkAgain}</Typography>
          </Button>
          <Button
            className={s.back}
            color={'$color-accent-500'}
            onClick={() => router.push(RouteNames.SIGN_IN)}
            type={'button'}
            variant={'link'}
          >
            <Typography variant={'bold16'}>{t.auth.backToSignIn}</Typography>
          </Button>
          <ControlledRecaptcha
            className={s.recaptcha}
            control={control}
            error={errors?.recaptcha?.message}
            name={'recaptcha'}
            primary
          />
        </form>
      </Card>
    </div>
  )
}
