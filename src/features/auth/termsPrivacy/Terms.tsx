'use client'

import { useRouter } from 'next/router'
import ArrowLeftIcon from 'public/icon/arrowLeftIcon.svg'
import { Header } from '@/src/shared/header/ui/Header'
import { useTranslate } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui/button'
import { Typography } from '@/src/shared/ui/typography'
import { RouteNames } from 'src/shared/const/routeNames'
import s from './style.module.scss'

export const Terms = () => {
  const { t } = useTranslate()
  const router = useRouter()

  return (
    <div className={s.terms}>
      <Header />
      <div className={s.main}>
        <div className={s.SignUp}>
          <Button
            as={'a'}
            className={s.btn}
            variant={'text'}
            onClick={() => router.push(RouteNames.SIGN_IN)}
          >
            <div className={s.arrow}>
              {/*<Image className={s.img} src={ImageArrow} alt="arrow" />*/}
              <div className={s.img}>
                <ArrowLeftIcon />
              </div>
              <Typography variant={'regular14'}> {t.auth.BackToSignUp}</Typography>
            </div>
          </Button>
        </div>
        <div className={s.Text}>
          <Typography className={s.title} variant="h1">
            {t.auth.privacyAndTermsPages.titleOfTermsOfService}
          </Typography>
          <br />
          <div>
            {t.auth.privacyAndTermsPages.textOfTerms.split(/\n+/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
