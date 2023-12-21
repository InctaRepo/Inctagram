import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './header.module.scss'

import { RouteNames } from '@/src/shared/const/routeNames'
import { useTranslate } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui/button'
import { Options, SelectBox } from '@/src/shared/ui/selectBox'
import { Typography } from '@/src/shared/ui/typography'
import FlagRussiaIcon from 'public/icon/flagRussiaIcon.svg'
import FlagUKIcon from 'public/icon/flagUKIcon.svg'
import OutlineBellIcon from 'public/icon/outlineBellIcon.svg'

type HeaderType = {
  variant?: 'public'
}
export const Header = ({ variant }: HeaderType) => {
  const { push, pathname, query, asPath, locale } = useRouter()
  const { t } = useTranslate()
  const languages: Options[] = [
    { value: 'English', image: <FlagUKIcon /> },
    { value: 'Russian', image: <FlagRussiaIcon /> },
  ]
  const changeLangHandler = (value: string | number) => {
    if (typeof value == 'string') {
      const locale = value.slice(0, 2).toLowerCase()

      push({ pathname, query }, asPath, { locale })
    }
  }

  return (
    <div className={s.containerMain}>
      <div className={s.container}>
        <div className={s.content}>
          <Typography variant="large" className={s.text}>
            <Link className={s.incta} href={RouteNames.HOME} tabIndex={1}>
              Inсtagram
            </Link>
          </Typography>
          <div className={s.options_container}>
            <OutlineBellIcon />
            <div className={s.select}>
              <SelectBox
                options={languages}
                onValueChange={changeLangHandler}
                defaultValue={locale === 'en' ? languages[0].value : languages[1].value}
              />
            </div>
            {variant === 'public' && (
              <div className={s.button_container}>
                <Button variant="link" color={'link'} onClick={() => push(RouteNames.SIGN_IN)}>
                  {t.auth.signIn}
                </Button>
                <Button variant="link" color={'link'} onClick={() => push(RouteNames.SIGN_UP)}>
                  {t.auth.signUp}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
