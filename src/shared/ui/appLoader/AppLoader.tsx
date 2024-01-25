import React from 'react'

import s from '@/ui/appLoader/appLoader.module.scss'

export const AppLoader = () => {
  return (
    <div className={s.wrapper}>
      <span className={s.loader}></span>
    </div>
  )
}
