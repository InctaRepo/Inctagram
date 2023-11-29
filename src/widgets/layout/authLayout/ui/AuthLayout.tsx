import { NextPage } from 'next'
import { PropsWithChildren, ReactElement } from 'react'
import { appIsInitializedSelector } from '@/src/shared/app'
import { Header } from '@/src/shared/header/ui/Header'
import { useGetMeQuery } from '@/src/shared/hoc/service/authProvider'
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
