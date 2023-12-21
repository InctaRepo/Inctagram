import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'

import s from './authLayout.module.scss'

import { RouteNames } from '@/src/shared/const/routeNames'
import { Header } from '@/src/shared/header'
import { AuthProvider, getUserId } from '@/src/shared/hoc'
import { useAppSelector } from '@/src/shared/hooks'

export const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const userId = useAppSelector(getUserId)
  const { asPath } = useRouter()
  const isAuthPath = asPath.startsWith(RouteNames.AUTH) || asPath.endsWith('404')

  return (
    <div className={s.container}>
      {userId && <Header />}
      {isAuthPath && !userId && <Header />}
      {!isAuthPath && !userId && <Header variant="public" />}
      <div className={s.main}>{children}</div>
    </div>
  )
}

export const getAuthLayout = (page: ReactElement) => {
  return (
    <>
      <AuthProvider>
        <AuthLayout>{page}</AuthLayout>
      </AuthProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        closeOnClick
        draggable
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  )
}
export const getPublicLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>
