import React from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative,@conarti/feature-sliced/layers-slices
import { getAuthUser } from '@/src/features/auth/authService'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetUserPostsQuery } from '@/src/features/posts'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative,@conarti/feature-sliced/layers-slices
import { EditPostModal } from '@/src/features/posts/editDeletePost/EditPostModal'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { UserInfo } from '@/src/features/profile/service/profileApiTypes'
import { useAppSelector } from '@/src/shared/hooks'
import s from './listImage.module.scss'

type Props = {
  userData?: UserInfo
}

export const ListImage = ({ userData }: Props) => {

  const user = useAppSelector(getAuthUser)

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
