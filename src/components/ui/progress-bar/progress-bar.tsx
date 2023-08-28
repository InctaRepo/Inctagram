import { useEffect } from 'react'

import NProgress from 'nprogress'

import s from './progress-bar.module.scss'

export const ProgressBar = () => {
  //TODO with redux toolkit
  // const isFetching = useIsFetching()

  // useEffect(() => {
  //   if (isFetching) {
  //     NProgress.start()
  //   } else {
  //     NProgress.done()
  //   }
  //
  //   return () => {
  //     NProgress.done()
  //   }
  // }, [isFetching])

  return <div className={s.wrapper}></div>
}
