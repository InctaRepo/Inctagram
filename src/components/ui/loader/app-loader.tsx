import React from 'react'

import s from './loader.module.scss'

export const AppLoader = () => {
  return (
    <div className={s.wrapper}>
      <span className={s.loader}></span>
    </div>
  )
}
