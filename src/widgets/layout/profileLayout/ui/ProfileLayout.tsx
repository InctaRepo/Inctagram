import { NextPage } from 'next'
import { PropsWithChildren, ReactElement } from 'react'
import { Header } from 'src/shared/header'
import s from './profileLayout.module.scss'

const ProfileLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.container}>
      <Header />
      <div className={s.main}>{children}</div>
    </div>
  )
}

export const getProfileLayout = (page: ReactElement) => <ProfileLayout>{page}</ProfileLayout>
