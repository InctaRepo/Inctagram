import { memo, useCallback, useMemo } from 'react'

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

type Props = {
  variant?: 'public'
}

export const Header = memo(function Header({ variant }: Props) {
  const { asPath, locale, pathname, push, query } = useRouter()
  const { t } = useTranslate()

  const languages: Option[] = useMemo(() => {
    return [
      { id: 'eng01', image: <FlagUKIcon />, value: 'English' },
      { id: 'rus01', image: <FlagRussiaIcon />, value: 'Russian' },
    ]
  }, [])
  const changeLangHandler = useCallback(
    (value: number | string) => {
      if (typeof value == 'string') {
        const locale = value.slice(0, 2).toLowerCase()

        push({ pathname, query }, asPath, { locale })
      }
    },
    [asPath, pathname, push, query]
  )
  const defaultValue = useMemo(() => {
    return locale === 'en' ? languages[0].value : languages[1].value
  }, [languages, locale])

  return (
    <header className={s.header}>
      <div className={s.content}>
        <Typography className={s.text} variant={'large'}>
          <Link className={s.incta} href={'/'} tabIndex={0}>
            Inсtagram
          </Link>
        </Typography>
        <div className={s.options_container}>
          <OutlineBellIcon />
          <div className={s.select}>
            <SelectBox
              defaultValue={defaultValue}
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
})
