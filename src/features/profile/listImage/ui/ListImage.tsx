import React, { useCallback, useState } from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative,@conarti/feature-sliced/layers-slices
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useSelector } from 'react-redux'
import { StateSchema } from '@/src/store'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetUserPostsQuery } from '@/src/features/posts'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative,@conarti/feature-sliced/layers-slices
import { EditPostModal } from '@/src/features/posts/editDeletePost/EditPostModal'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { UserInfo } from '@/src/features/profile/service/profileApiTypes'
import s from './listImage.module.scss'

type Props = {
  userData?: UserInfo
}

export const ListImage = ({ userData }: Props) => {
  // const user = useAppSelector(getAuthUser)

  const { data } = useGetUserPostsQuery(userData?.userId)

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
