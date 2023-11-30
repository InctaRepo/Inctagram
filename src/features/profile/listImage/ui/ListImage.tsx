import React, { useCallback, useState } from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative,@conarti/feature-sliced/layers-slices
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetUserPostsQuery } from '@/src/features/posts'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative,@conarti/feature-sliced/layers-slices
import { EditPostModal } from '@/src/features/posts/editDeletePost/EditPostModal'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { UserInfo } from '@/src/features/profile/service/profileApiTypes'
import s from './listImage.module.scss'

type Props = {
  userData?: UserInfo
  id: string | string[] | undefined
}

export const ListImage = ({ userData, id }: Props) => {
  const [currentId, setCurrentId] = useState<null | string>(null)
  // const user = useAppSelector(getAuthUser)

  const { data } = useGetUserPostsQuery(id)
  // const { data: post } = useGetUserPostQuery(currentId)

  const getCurrentPostId = useCallback((id: string | null) => {
    setCurrentId(id)
  }, [])

  return (
    <div className={s.container}>
      {data?.data?.items.map((el, index) => (
        <EditPostModal
          callBack={getCurrentPostId}
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
