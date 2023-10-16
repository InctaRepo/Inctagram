import React, { FC } from 'react'

import { Separator } from '@radix-ui/react-separator'

import s from './post-description.module.scss'

import DotsOutline from '@/src/assets/icons/more-horizontal-outline'

type PropsType = {
  defaultValue?: string | number
}

export const PostDescription: FC<PropsType> = ({ defaultValue }) => {
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.title}>
          <div className={s.user}></div>
          <DotsOutline />
        </div>
        <Separator className={s.separator} />
      </div>
    </>
  )
}
