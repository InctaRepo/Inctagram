import Link from 'next/link'
import { useRouter } from 'next/router'

import FlagRussiaIcon from '@/public/icon/flagRussiaIcon.svg'
import FlagUKIcon from '@/public/icon/flagUKIcon.svg'
import OutlineBellIcon from '@/public/icon/outlineBellIcon.svg'
import { RouteNames } from '@/shared/const'
import s from '@/shared/header/ui/header.module.scss'
import { useTranslate } from '@/shared/hooks'
import { Button } from '@/ui/button'
import { Option, SelectBox } from '@/ui/selectBox'
import { Typography } from '@/ui/typography'

type HeaderType = {
  variant?: 'public'
}
export const Header = ({ variant }: HeaderType) => {
  const { push, pathname, query, asPath, locale } = useRouter()
  const { t } = useTranslate()
  const languages: Option[] = [
    { value: 'English', image: <FlagUKIcon />, id: 'eng01' },
    { value: 'Russian', image: <FlagRussiaIcon />, id: 'rus01' },
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
            <Link className={s.incta} href={'/'} tabIndex={1}>
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
                  {t.auth.logInHeader}
                </Button>
                <Button variant="primary" color={'link'} onClick={() => push(RouteNames.SIGN_UP)}>
                  {t.auth.signUpHeader}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
