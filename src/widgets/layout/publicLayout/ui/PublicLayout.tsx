import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import { Header } from '@/src/shared/header'
import s from '@/src/widgets/layout/publicLayout/ui/publicLayout.module.scss'

export const PublicLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.container}>
      <Header variant="public" />
      <div className={s.main}>{children}</div>
    </div>
  )
}
export const getPublicLayout = (page: ReactElement) => <PublicLayout>{page}</PublicLayout>
