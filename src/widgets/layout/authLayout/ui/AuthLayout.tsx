import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PropsWithChildren, ReactElement } from 'react'
import { RouteNames } from '@/src/shared/const/routeNames'
import { Header } from '@/src/shared/header/ui/Header'
import { getUserId } from '@/src/shared/hoc/model/selectors/getUserId/getUserId'
import { useAppSelector } from '@/src/shared/hooks'
import s from './authLayout.module.scss'

const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const userId = useAppSelector(getUserId)
  const { asPath } = useRouter()
  const isAuthPath = asPath.startsWith(RouteNames.AUTH)

  return (
    <div className={s.container}>
      {userId && <Header />}
      {isAuthPath && !userId && <Header />}
      {!isAuthPath && !userId && <Header variant="public" />}
      <div className={s.main}>{children}</div>
    </div>
  )
}

export const getAuthLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>
