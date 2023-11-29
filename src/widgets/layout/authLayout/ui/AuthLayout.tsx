import { NextPage } from 'next'
import { PropsWithChildren, ReactElement } from 'react'
import { Header } from '@/src/shared/header/ui/Header'
import s from './authLayout.module.scss'

const AuthLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.container}>
      <Header />
      <div className={s.main}>{children}</div>
    </div>
  )
}

export const getAuthLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>
