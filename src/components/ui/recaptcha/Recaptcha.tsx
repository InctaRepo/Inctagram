import React, { useState } from 'react'

import './recaptcha.scss'
import Image from 'next/image'

import Privacy from '@/src/assets/icons/recaptcha.svg'
import Checked from '@/src/assets/icons/recaptchaChecked.svg'

interface FormProps {
  primary?: boolean
  expired?: boolean
  className?: string
}

export const Recaptcha = ({ primary, expired, className }: FormProps) => {
  // eslint-disable-next-line no-nested-ternary
  const mode = `storybook-recaptcha--${primary ? 'primary' : !expired ? 'error' : 'expired'}`

  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const onClick = () => {
    setIsLoading(!isLoading)

    setTimeout(() => {
      setIsLoading(!isLoading)
      setIsChecked(!isChecked)
    }, 2000)
  }

  return (
    <div className={mode}>
      <div className={`recaptcha ${className}`}>
        <div className="agreement">
          <div className={`expiredMessage ${!expired ? 'hidden' : ''}`}>
            Verification expired. Check the checkbox again.
          </div>
          <div className={`customCheckbox ${isLoading ? 'hidden' : ''}`} onClick={onClick}></div>
          <div className={`lds-ring ${!isLoading || isChecked ? 'hidden' : ''}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <Image src={Checked} className={`checked ${!isChecked ? 'hidden' : ''}`} alt="checked" />
          <label>I&apos;m not a robot</label>
        </div>
        <div className="privacy">
          <Image src={Privacy} width="46" height="57" alt="privacy" />
        </div>
      </div>
      <p className={`error-text`}>Please verify that you are not a robot</p>
    </div>
  )
}
