import React from 'react'
import { useAppSelector } from '@/src/shared/hooks'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { authUserSelector } from '../../auth/authService'
import s from './listImage.module.scss'

export const ListImage = () => {
  const user = useAppSelector(authUserSelector)
  // const { data } = useGetUserPostsQuery(user?.userId!)

  return (
    <div className={s.container}>
      {/*{data?.data?.items.map((el, index) => {*/}
      {/*  return <Image className={s.image} key={index} src={el.images} alt={'ds'} />*/}
      {/*})}*/}
    </div>
  )
}
