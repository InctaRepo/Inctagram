import React, { useState } from 'react'

import Image from 'next/image'

import s from './recaptcha.module.scss'

import Privacy from '@/src/assets/icons/recaptcha.svg'
import Checked from '@/src/assets/icons/recaptchaChecked.svg'
import { Card } from 'src/components/ui/card-temporary'

interface FormProps {
  primary?: boolean
  expired?: boolean
  className?: string
  setRecaptchaVal: (value: boolean) => void
}

export const Recaptcha = ({ primary, expired, className, setRecaptchaVal }: FormProps) => {
  // eslint-disable-next-line no-nested-ternary
  const mode = `storybook-recaptcha--${primary ? 'primary' : !expired ? 'error' : 'expired'}`

  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const onClick = () => {
    setIsLoading(!isLoading)

    setTimeout(() => {
      setIsLoading(!isLoading)
      setIsChecked(!isChecked)
      setRecaptchaVal(true)
    }, 2000)
  }

  return (
    <div className={s[mode]}>
      <Card className={`${s.recaptcha} ${className}`}>
        <div className={s.agreement}>
          <div className={`${s.expiredMessage} ${!expired ? s.hidden : ''}`}>
            Verification expired. Check the checkbox again.
          </div>
          <div className={`${s.customCheckbox} ${isLoading ? s.hidden : ''}`} onClick={onClick} />
          <div className={`${s.ldsRing} ${!isLoading || isChecked ? s.hidden : ''}`}>
            <div />
            <div />
            <div />
            <div />
          </div>
          <Image
            src={Checked}
            className={`${s.checked} ${!isChecked ? s.hidden : ''}`}
            alt="checked"
          />
          <label>I&apos;m not a robot</label>
        </div>
        <div className={s.privacy}>
          <Image src={Privacy} width="46" height="57" alt="privacy" />
        </div>
      </Card>
      <p className={`${s.errorText} ${primary && !expired ? s.hidden : ''}`}>
        Please verify that you are not a robot
      </p>
    </div>
  )
}
