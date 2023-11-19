import { NextPage } from 'next'
import { PropsWithChildren, ReactElement } from 'react'
import { Header } from '@/src/shared/header/ui/Header'
import s from './PublicProfileLayout.module.scss'

export const PublicProfileLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.container}>
      <Header variant="public" />
      <div className={s.main}>{children}</div>
    </div>
  )
}
export const getPublicProfileLayout = (page: ReactElement) => (
  <PublicProfileLayout>{page}</PublicProfileLayout>
)
