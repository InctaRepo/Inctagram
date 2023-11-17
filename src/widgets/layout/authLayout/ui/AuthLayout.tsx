import { NextPage } from 'next'
import { PropsWithChildren, ReactElement } from 'react'
import { appIsInitializedSelector } from '@/src/shared/app'
import { useGetMeQuery } from '@/src/features/auth/authService/authApi'
import { Header } from '@/src/shared/header/ui/Header'
import { useAppSelector } from '@/src/shared/hooks'
import { AppLoader } from 'src/shared/ui/appLoader'
import s from './authLayout.module.scss'

const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const {} = useGetMeQuery()

  const isInitialized = useAppSelector(appIsInitializedSelector)

  return (
    <div className={s.container}>
      <Header />
      <div className={s.main}>{isInitialized ? children : <AppLoader />}</div>
    </div>
  )
}

export const getAuthLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>
