import { PropsWithChildren, useEffect } from 'react'

import { NextPage } from 'next'
import NProgress from 'nprogress'

import { useAppSelector } from '@/src/shared/hooks'
import { getIsLoading } from '@/src/shared/ui/progressBar/model/selectors/getIsLoading'
import s from '@/src/shared/ui/progressBar/progressBar.module.scss'

export const ProgressBar: NextPage<PropsWithChildren> = ({ children }) => {
  const isLoading = useAppSelector(getIsLoading)

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
