import { PropsWithChildren, useMemo } from 'react'

import { RouteNames } from '@/shared/const'
import { Header } from '@/shared/header'
import { getIsAuth } from '@/shared/hoc'
import { useAppSelector } from '@/shared/hooks'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import s from '@/widgets/layout/authLayout/ui/authLayout.module.scss'

export const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const isAuth = useAppSelector(getIsAuth)
  const { asPath, pathname } = useRouter()
  const isPublicPath =
    asPath.startsWith(RouteNames.AUTH) ||
    asPath.endsWith('404') ||
    pathname === RouteNames.PUBLIC_PAGE
  const variant = useMemo(() => {
    return !isPublicPath && isAuth ? undefined : 'public'
  }, [isPublicPath, isAuth])

  return (
    <div className={s.container}>
      <Header variant={variant} />
      <main className={s.main}>{children}</main>
    </div>
  )
}
