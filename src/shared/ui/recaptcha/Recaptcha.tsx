import React, { ComponentPropsWithoutRef, ElementRef, forwardRef, useEffect, useState } from 'react'

import Privacy from '@/public/icon/recaptcha.svg'
import RecaptchaChecked from '@/public/icon/recaptchaChecked.svg'
import { RouteNames } from '@/shared/const'
import { useTranslate } from '@/shared/hooks'
import { Card } from '@/ui/card'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from '@/ui/recaptcha/recaptcha.module.scss'

export type RecaptchaProps = {
  className?: string
  error?: string
  expired?: boolean
  id?: string
  onChange?: (value: boolean) => void
  primary?: boolean
} & ComponentPropsWithoutRef<'label'>
export type ForgotForm = {
  email: string
  recaptcha: boolean
}
const CSSMod = {
  error: 'error',
  expired: 'expired',
  primary: 'primary',
}

export const Recaptcha = forwardRef<ElementRef<'label'>, RecaptchaProps>(
  ({ className, error, expired, onChange }, ref) => {
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
      checked: clsx(s.checked, !isChecked && s.hidden),
      customCheckbox: clsx(s.customCheckbox, isLoading && s.hidden),
      errorText: clsx(s.errorText, !error && s.hidden),
      expired: clsx(s.expiredMessage, !expired && s.hidden),
      main: clsx(s.recaptcha, className),
      preloader: clsx(s.ldsRing, (!isLoading || isChecked) && s.hidden),
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
            <RecaptchaChecked alt={'checked'} className={classNames.checked} />
            <label ref={ref}>{t.auth.authErrors.recaptcha.notARobot}</label>
          </div>
          <div className={s.privacy}>
            <Privacy
              alt={'privacy'}
              height={'57'}
              onClick={() => router.push(RouteNames.TERMS_OF_USE)}
              width={'46'}
            />
          </div>
        </Card>
        <p className={classNames.errorText}>{t.auth.authErrors.recaptcha.verifyPlease}</p>
      </div>
    )
  }
)
