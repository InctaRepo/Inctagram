import React, { useEffect, useState } from 'react'

import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FieldValues, UseControllerProps } from 'react-hook-form'

import { RouteNames } from '@/src/shared/const'
import { useTranslate } from '@/src/shared/hooks'
import { Card } from '@/src/shared/ui/card'
import s from '@/src/shared/ui/recaptcha/recaptcha.module.scss'
import Privacy from 'public/icon/recaptcha.svg'
import RecaptchaChecked from 'public/icon/recaptchaChecked.svg'

export type RecaptchaProps = {
  primary?: boolean
  expired?: boolean
  className?: string
  error?: string | undefined
  onChange?: (val: boolean) => void
}
export type ForgotForm = {
  email: string
  recaptcha: boolean
}
type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValues'> &
  Omit<RecaptchaProps, 'value'>

const CSSMod = {
  primary: 'primary',
  error: 'error',
  expired: 'expired',
}

export const Recaptcha = <T extends FieldValues>({
  className,
  error,
  expired,
  onChange,
}: Props<ForgotForm>) => {
  const [mode, setMode] = useState(CSSMod.primary)
  const { t } = useTranslate()
  const router = useRouter()

  useEffect(() => {
    if (error) {
      // Current active styles in mode
      setMode(CSSMod.error)
    } else {
      setMode(CSSMod.primary)
    }
  }, [error])

  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const onClick = () => {
    setIsLoading(!isLoading)

    setTimeout(() => {
      setIsLoading(!isLoading)
      setIsChecked(!isChecked)
      onChange?.(true)
    }, 1000)
  }

  const classNames = {
    main: clsx(s.recaptcha, className),
    expired: clsx(s.expiredMessage, !expired && s.hidden),
    customCheckbox: clsx(s.customCheckbox, isLoading && s.hidden),
    preloader: clsx(s.ldsRing, (!isLoading || isChecked) && s.hidden),
    checked: clsx(s.checked, !isChecked && s.hidden),
    errorText: clsx(s.errorText, !error && s.hidden),
  }

  return (
    <div className={s[mode]}>
      <Card className={classNames.main}>
        <div className={s.agreement}>
          <div className={classNames.expired}>{t.auth.authErrors.recaptcha.expired}</div>
          <div className={classNames.customCheckbox} onClick={onClick} />
          <div className={classNames.preloader}>
            <div />
            <div />
            <div />
            <div />
          </div>
          <RecaptchaChecked className={classNames.checked} alt="checked" />
          <label>{t.auth.authErrors.recaptcha.notARobot}</label>
        </div>
        <div className={s.privacy}>
          <Privacy
            width="46"
            height="57"
            alt="privacy"
            onClick={() => router.push(RouteNames.TERMS_OF_USE)}
          />
        </div>
      </Card>
      <p className={classNames.errorText}>{t.auth.authErrors.recaptcha.verifyPlease}</p>
    </div>
  )
}
