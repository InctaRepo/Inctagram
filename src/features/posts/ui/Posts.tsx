import React, { useCallback, useState } from 'react'

import { ShowPostModal } from '@/src/entities/post/showPostModal'
import {
  GetUserPostResponse,
  useGetUserPostQuery,
  useGetUserPostsQuery,
} from '@/src/features/posts'
import s from '@/src/features/posts/ui/posts.module.scss'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profileSettings/service'
import { UseInfiniteScroll } from '@/src/shared/hooks/ useInfiniteScroll'
import { Loader } from '@/src/shared/ui/loader/Loader'

type Props = Pick<UseInfiniteScroll, 'isLoading' | 'loadMoreCallback' | 'isLastPage'> & {
  userData?: UserInfo
  variant?: string
  postId?: string
  postData: GetUserPostResponse
}

export const Posts = ({
  userData,
  postId,
  variant,
  postData,
  isLoading,
  loadMoreCallback,
  isLastPage,
}: Props) => {
  const [currentId, setCurrentId] = useState<null | string>(null)
  // const user = useAppSelector(getAuthUser)

  const { data } = useGetUserPostsQuery(userData?.userId)

  const getCurrentPostId = useCallback((id: string | null) => {
    setCurrentId(id)
  }, [])

  return (
    <div className={s.container}>
      {data?.data?.items.map((el, index) => (
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
          postData={postData}
        />
      ))}
      <Loader isLoading={isLoading} isLastPage={isLastPage} loadMoreCallback={loadMoreCallback} />
    </div>
  )
}
