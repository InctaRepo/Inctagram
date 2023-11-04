import React from 'react'

import Image from 'next/image'

import image from '@/src/assets/images/img_avatar.png'
import s from '@/src/components/profile/list-image/list-image.module.scss'
import { useAppSelector } from '@/src/services'
import { useGetUserPostsQuery } from '@/src/services/posts'

export const ListImage = () => {
  const { userId } = useAppSelector(state => state.auth.user!)

  const { data } = useGetUserPostsQuery(userId!)

  return (
    <div className={s.container}>
      {/*{data?.data?.items.map((el, index) => {*/}
      {/*  return <Image className={s.image} key={index} src={el.images} alt={'ds'} />*/}
      {/*})}*/}
    </div>
  )
}
