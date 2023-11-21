'use client'

import ArrowLeftIcon from 'public/icon/arrowLeftIcon.svg'
import { Header } from '@/src/shared/header/ui/Header'
import { useTranslate } from '@/src/shared/hooks'
import { useHistory } from '@/src/shared/hooks/useHistory'
import { Button } from '@/src/shared/ui/button'
import { Typography } from 'src/shared/ui/typography'
import s from './style.module.scss'

export const Privacy = () => {
  const { back } = useHistory()
  const { t } = useTranslate()

  return (
    <div className={s.terms}>
      <Header />
      <div className={s.main}>
        <div className={s.SignUp}>
          <Button as={'a'} className={s.btn} variant={'text'} onClick={back}>
            <div className={s.arrow}>
              <div className={s.img}>
                <ArrowLeftIcon />
              </div>
              <Typography variant={'regular14'}> {t.auth.Return}</Typography>
            </div>
          </Button>
        </div>

        <div className={s.Text}>
          <Typography className={s.title} variant="h1">
            {t.auth.privacyAndTermsPages.titleOfPrivacyPolicy}
          </Typography>

          <br />
          <div>
            {t.auth.privacyAndTermsPages.textOfPrivacy.split(/\n+/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
