'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Typography } from '../../../ui/typography'

import s from './style.module.scss'

import { useTranslate } from '@/src/assets/hooks'
import ImageArrow from '@/src/assets/images/rightArrow.png'
import { RouteNames } from '@/src/common/constants/route-names'
import { Header } from '@/src/components/layout/header/header'
import { Button } from '@/src/components/ui/button'

export const Privacy = () => {
  const { t } = useTranslate()
  const router = useRouter()

  return (
    <div>
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
              <Image className={s.img} src={ImageArrow} alt="arrow" />
              <Typography variant={'regular14'}> {t.auth.BackToSignUp}</Typography>
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
