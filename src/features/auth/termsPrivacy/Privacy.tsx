'use client'

import s from '@/src/features/auth/termsPrivacy/style.module.scss'
import { Header } from '@/src/shared/header/ui/Header'
import { useHistory, useTranslate } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui/button'
import { Typography } from '@/src/shared/ui/typography'
import ArrowLeftIcon from 'public/icon/arrowLeftIcon.svg'

export const Privacy = () => {
  const { back } = useHistory()
  const { t } = useTranslate()

  return (
    <div className={s.terms}>
      <Header />
      <div className={s.main}>
        <div className={s.SignUp}>
          <Button as={'a'} className={s.btn} variant={'text'} onClick={back}>
            <div className={s.img}>
              <ArrowLeftIcon className={s.logo} />
            </div>
            <Typography variant="regular14" className={s.textReturn}>
              {t.auth.Return}
            </Typography>
          </Button>
        </div>
        <div className={s.Text}>
          <Typography className={s.title} variant="h1">
            {t.auth.privacyAndTermsPages.titleOfPrivacyPolicy}
          </Typography>

          <br />
          <div>
            {t.auth.privacyAndTermsPages.textOfPrivacy
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
