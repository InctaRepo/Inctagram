import { PropsWithChildren } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { RouteNames } from '@/shared/const'
import { Header } from '@/shared/header'
import { getIsAuth } from '@/shared/hoc'
import { useAppSelector } from '@/shared/hooks'
import s from '@/widgets/layout/authLayout/ui/authLayout.module.scss'

export const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const isAuth = useAppSelector(getIsAuth)
  const { asPath, pathname } = useRouter()
  const isPublicPath =
    asPath.startsWith(RouteNames.AUTH) ||
    asPath.endsWith('404') ||
    pathname === RouteNames.PUBLIC_PAGE

  return (
    <div className={s.container}>
      <Header variant={!isPublicPath && isAuth ? undefined : 'public'} />
      <div className={s.main}>{children}</div>
    </div>
  )
}
