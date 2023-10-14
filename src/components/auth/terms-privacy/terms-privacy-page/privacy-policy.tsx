'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Typography } from '../../../ui/typography'

import s from './style.module.scss'

import { useTranslate } from '@/src/assets/hooks'
import ImageArrow from '@/src/assets/images/rightArrow.png'
import { RouteNames } from '@/src/common/constants/route-names'
import { Header } from '@/src/components/layout/header/header'

export const Privacy = () => {
  const { t } = useTranslate()

  return (
    <div>
      <Header />
      <div className={s.main}>
        <Typography variant={'regular14'} className={s.SignUp}>
          <Link className={s.link} href={RouteNames.SIGN_IN}>
            <span className={s.arrow}>
              <Image className={s.img} src={ImageArrow} alt="arrow" />
              {t.auth.BackToSignUp}
            </span>
          </Link>
        </Typography>

        <div className={s.Text}>

          <Typography className={s.title} variant="h1">{
            t.auth.privacyAndTermsPages.titleOfPrivacyPolicy}
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
