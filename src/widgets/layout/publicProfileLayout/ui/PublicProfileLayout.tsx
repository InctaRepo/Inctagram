import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import { Header } from '@/src/shared/header'
import s from 'src/widgets/layout/publicProfileLayout/ui/PublicProfileLayout.module.scss'

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
