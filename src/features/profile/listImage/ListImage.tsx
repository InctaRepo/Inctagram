import Image from 'next/image'
import React from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetUserPostsQuery } from '@/src/features/posts/postApi'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { EditPostModal } from '@/src/features/profile/newPost/editDeletePost/EditPostModal'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { UserInfo } from '@/src/features/profile/service/profileApiTypes'
import { useAppSelector } from '@/src/shared/hooks'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { authUserSelector } from '../../auth/authService'
import s from './listImage.module.scss'

type Props = {
  userData: UserInfo
}

export const ListImage = ({ userData }: Props) => {
  const user = useAppSelector(authUserSelector)
  const { data } = useGetUserPostsQuery(user?.userId!)

  return (
    <div className={s.container}>
      {data?.data?.items.map((el, index) => (
        <EditPostModal
          modalWidth={'edit'}
          description={el.description}
          key={index}
          images={el.images}
          id={el.id}
          createdAt={el.createdAt}
          userData={userData}
        />
      ))}
    </div>
  )
}
