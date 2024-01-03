import { PropsWithChildren, useEffect } from 'react'

import { NextPage } from 'next'
import NProgress from 'nprogress'

import { appIsLoadingSelector } from '@/src/shared/app'
import { useAppSelector } from '@/src/shared/hooks'
import s from '@/src/shared/ui/progressBar/progressBar.module.scss'

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
