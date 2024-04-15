import FlagRussiaIcon from '@/public/icon/flagRussiaIcon.svg'
import FlagUKIcon from '@/public/icon/flagUKIcon.svg'
import OutlineBellIcon from '@/public/icon/outlineBellIcon.svg'
import { RouteNames } from '@/shared/const'
import { useTranslate } from '@/shared/hooks'
import { Button } from '@/ui/button'
import { Option, SelectBox } from '@/ui/selectBox'
import { Typography } from '@/ui/typography'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from '@/shared/header/ui/header.module.scss'

type HeaderType = {
  variant?: 'public'
}
export const Header = ({ variant }: HeaderType) => {
  const { asPath, locale, pathname, push, query } = useRouter()
  const { t } = useTranslate()
  const languages: Option[] = [
    { id: 'eng01', image: <FlagUKIcon />, value: 'English' },
    { id: 'rus01', image: <FlagRussiaIcon />, value: 'Russian' },
  ]
  const changeLangHandler = (value: number | string) => {
    if (typeof value == 'string') {
      const locale = value.slice(0, 2).toLowerCase()

      push({ pathname, query }, asPath, { locale })
    }
  }

  return (
    <header className={s.header}>
      <div className={s.content}>
        <Typography className={s.text} variant={'large'}>
          <Link className={s.incta} href={'/'} tabIndex={1}>
            Inсtagram
          </Link>
        </Typography>
        <div className={s.options_container}>
          <OutlineBellIcon />
          <div className={s.select}>
            <SelectBox
              defaultValue={locale === 'en' ? languages[0].value : languages[1].value}
              onValueChange={changeLangHandler}
              options={languages}
            />
          </div>
          {variant === 'public' && (
            <div className={s.button_container}>
              <Button color={'link'} onClick={() => push(RouteNames.SIGN_IN)} variant={'link'}>
                {t.auth.logInHeader}
              </Button>
              <Button color={'link'} onClick={() => push(RouteNames.SIGN_UP)} variant={'primary'}>
                {t.auth.signUpHeader}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
