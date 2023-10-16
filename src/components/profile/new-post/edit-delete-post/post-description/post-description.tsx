import React, { FC } from 'react'

import { Separator } from '@radix-ui/react-separator'

import s from './post-description.module.scss'

import { Buttons } from '@/src/components/profile/new-post/edit-delete-post/post-description/edit-delete-buttons/buttons'

type PropsType = {
  defaultValue?: string | number
}

export const PostDescription: FC<PropsType> = ({ defaultValue }) => {
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.title}>
          <div className={s.user}></div>
          <Buttons />
        </div>
        <Separator className={s.separator} />
      </div>
    </>
  )
}
