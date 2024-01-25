import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'

import { RouteNames } from '@/shared/const'
import { Header } from '@/shared/header'
import { AuthProvider, getIsAuth } from '@/shared/hoc'
import { useAppSelector } from '@/shared/hooks'
import s from '@/widgets/layout/authLayout/ui/authLayout.module.scss'

export const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const isAuth = useAppSelector(getIsAuth)
  const { asPath } = useRouter()
  const isAuthPath = asPath.startsWith(RouteNames.AUTH) || asPath.endsWith('404')

  return (
    <div className={s.container}>
      {isAuth && <Header />}
      {isAuthPath && !isAuth && <Header />}
      {!isAuthPath && !isAuth && <Header variant="public" />}
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
