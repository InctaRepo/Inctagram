import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './auth-layout.module.scss'

import { Header } from '@/src/components/layout/header/header'
import { AppLoader } from '@/src/components/ui/loader'
import { useAppSelector } from '@/src/services'
import { appIsInitializedSelector } from '@/src/services/app'
import { useGetMeQuery } from '@/src/services/auth/auth-api'

export const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
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
