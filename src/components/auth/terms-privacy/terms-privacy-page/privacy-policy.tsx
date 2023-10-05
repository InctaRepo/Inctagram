'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Typography } from '../../../ui/typography'

import s from './style.module.scss'

import { useTranslate } from '@/src/assets/hooks'
import ImageArrow from '@/src/assets/images/rightArrow.png'
import { Header } from '@/src/components/layout/header/header'

export const Privacy = () => {
  const { t } = useTranslate()

  return (
    <div className={s.main}>
      <Header />

      <Typography variant={'regular14'} className={s.SignUp}>
        <Link className={s.link} href={'/auth/sign-up'}>
          <span className={s.arrow}>
            <Image className={s.img} src={ImageArrow} alt="arrow" />
            {t.auth.BackToSignUp}
          </span>
        </Link>
      </Typography>

      <div className={s.Text}>
        <Typography variant="h1">{t.auth.privacyAndTermsPages.titleOfPrivacyPolicy}</Typography>

        <br />
        <p>{t.auth.privacyAndTermsPages.textOfPrivacy}</p>
      </div>
    </div>
  )
}
