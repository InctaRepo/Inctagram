import { NextPage } from 'next'
import NProgress from 'nprogress'
import { PropsWithChildren, useEffect } from 'react'
import { appIsLoadingSelector } from '../../app'
import { useAppSelector } from '../../hooks'
import s from './progressBar.module.scss'

export const ProgressBar: NextPage<PropsWithChildren> = ({ children }) => {
  const isLoading = useAppSelector(appIsLoadingSelector)

  useEffect(() => {
    if (isLoading) {
      NProgress.start()
    } else {
      NProgress.done()
    }

    return () => {
      NProgress.done()
    }
  }, [isLoading])

  return <div className={s.wrapper}>{children}</div>
}
