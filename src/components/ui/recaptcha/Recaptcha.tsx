import React, { useEffect, useState } from 'react'

import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FieldError, FieldValues, UseControllerProps } from 'react-hook-form'

import s from './recaptcha.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import Privacy from '@/src/assets/icons/recaptcha.svg'
import Checked from '@/src/assets/icons/recaptchaChecked.svg'
import { Card } from 'src/components/ui/card-temporary'

export type RecaptchaProps = {
  primary?: boolean
  expired?: boolean
  className?: string
  errors?: FieldError | undefined
  onChange?: (val: boolean) => void
}

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValues'> &
  Omit<RecaptchaProps, 'value'>

const modes = ['mode-primary', 'mode-error', 'mode-expired']

export const Recaptcha = <T extends FieldValues>({
  className,
  errors,
  name,
  primary,
  expired,
  onChange,
  ...rest
}: Props<T>) => {
  const [mode, setMode] = useState(modes[0])
  const { t } = useTranslate()
  const router = useRouter()

  useEffect(() => {
    if (errors && 'recaptcha' in errors) {
      // Current active styles in mode
      setMode(modes[1])
    } else {
      setMode(modes[0])
    }
    //TODO: fix this ts error
  }, [errors && 'recaptcha' in errors && errors?.recaptcha])

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
    errorText: clsx(
      s.errorText,
      //TODO: fix this ts error
      !(errors && 'recaptcha' in errors && errors.recaptcha) && s.hidden
    ),
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
          <Image src={Checked} className={classNames.checked} alt="checked" />
          <label>{t.auth.authErrors.recaptcha.notARobot}</label>
        </div>
        <div className={s.privacy}>
          <Image
            src={Privacy}
            width="46"
            height="57"
            alt="privacy"
            onClick={() => router.push('/auth/terms-of-use')}
          />
        </div>
      </Card>
      <p className={classNames.errorText}>{t.auth.authErrors.recaptcha.verifyPlease}</p>
    </div>
  )
}
