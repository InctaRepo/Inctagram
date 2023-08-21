import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './auth-layout.module.scss'

import { Header } from '@/src/components/ui/Header/Header'

export const AuhtLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.container}>
      <Header />
      <div className={s.main}>{children}</div>
    </div>
  )
}

export const getAuthLayout = (page: ReactElement) => <AuhtLayout>{page}</AuhtLayout>
