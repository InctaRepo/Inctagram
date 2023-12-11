import React, { useCallback, useState } from 'react'

import { ShowPostModal } from '@/src/entities/post/showPostModal'
import { useGetUserPostQuery, useGetUserPostsQuery } from '@/src/features/posts'
import s from '@/src/features/posts/ui/posts.module.scss'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profileSettings/service'

type Props = {
  userData?: UserInfo
  variant?: string
  postId?: string
}

export const Posts = ({ userData, postId, variant }: Props) => {
  const [currentId, setCurrentId] = useState<null | string>(null)
  // const user = useAppSelector(getAuthUser)

  const { data } = useGetUserPostsQuery(userData?.userId)
  const { data: postData } = useGetUserPostQuery(postId!)

  const getCurrentPostId = useCallback((id: string | null) => {
    setCurrentId(id)
  }, [])

  return (
    <div className={s.container}>
      {!postId &&
        data?.data?.items.map((el, index) => (
          <ShowPostModal
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
      {postId &&
        data?.data?.items.map((el, index) => (
          <ShowPostModal
            callBack={getCurrentPostId}
            modalWidth={'edit'}
            description={el.description}
            key={index}
            images={el.images}
            id={el.id}
            createdAt={el.createdAt}
            userData={userData}
            postId={postId}
            variant={variant}
            postData={postData?.data}
          />
        ))}
    </div>
  )
}
