import { useEffect } from 'react'

// eslint-disable-next-line import/no-named-as-default
import NProgress from 'nprogress'

import s from './progress-bar.module.scss'

import { useAppSelector } from '@/src/services'
import { appIsLoadingSelector } from '@/src/services/app'

// eslint-disable-next-line import/no-named-as-default

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
