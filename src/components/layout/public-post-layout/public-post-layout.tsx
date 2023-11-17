import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './public-post-layout.module.scss'

import { Header } from '@/src/components/header/header'

export const PublicPostLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.container}>
      <Header variant="public" />
      <div className={s.main}>{children}</div>
    </div>
  )
}
export const getPublicPostLayout = (page: ReactElement) => (
  <PublicPostLayout>{page}</PublicPostLayout>
)