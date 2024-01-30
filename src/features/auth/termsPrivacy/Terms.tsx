'use client'

import React from 'react'

import s from '@/features/auth/termsPrivacy/style.module.scss'
import ArrowLeftIcon from '@/public/icon/arrowLeftIcon.svg'
import { Header } from '@/shared/header/ui/Header'
import { useHistory, useTranslate } from '@/shared/hooks'
import { Button } from '@/ui/button'
import { Typography } from '@/ui/typography'

export const Terms = () => {
  const { t } = useTranslate()
  const { back } = useHistory()

  return (
    <div className={s.terms}>
      <Header />
      <div className={s.main}>
        <div className={s.SignUp}>
          <Button as={'a'} className={s.btn} variant={'text'} onClick={back}>
            <div className={s.img}>
              <ArrowLeftIcon className={s.logo} />
            </div>
            <Typography variant={'regular14'} className={s.textReturn}>
              {t.auth.Return}
            </Typography>
          </Button>
        </div>
        <div className={s.Text}>
          <Typography className={s.title} variant="h1">
            {t.auth.privacyAndTermsPages.titleOfTermsOfService}
          </Typography>
          <br />
          <div>
            {t.auth.privacyAndTermsPages.textOfTerms
              .split(/\n+/)
              .map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
