import { useEffect } from 'react'

import NProgress from 'nprogress'

import s from './progress-bar.module.scss'

import { useAppSelector } from '@/src/services'
import { appIsLoadingSelector } from '@/src/services/app'

export const ProgressBar = () => {
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

  return <div className={s.wrapper}></div>
}
