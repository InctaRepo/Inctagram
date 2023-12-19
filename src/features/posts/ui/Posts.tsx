import React, { memo, useCallback, useState } from 'react'

import { ShowPostModal } from '@/src/entities/post/showPostModal'
import { useGetUserPostsQuery } from '@/src/features/posts'
import s from '@/src/features/posts/ui/posts.module.scss'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profileSettings/service'
import { useInfiniteScroll } from '@/src/shared/hooks/ useInfiniteScroll'
import { Loader } from '@/src/shared/ui/loader/Loader'

type Props = {
  userData?: UserInfo
  variant?: string
  postId?: string
  userId: string
}

export const Posts = memo(({ userData, postId, userId, variant }: Props) => {
  const [currentId, setCurrentId] = useState<null | string>(null)
  //TODO это нам нужно?
  const {
    data: posts,
    isLoading: isLoadingPosts,
    isSuccess,
    refetch,
  } = useGetUserPostsQuery({ userId: userId })
  const { isLoading, loadMoreCallback, hasDynamicPosts, dynamicPosts } = useInfiniteScroll(
    posts?.data?.items!,
    userId
  )

  // useEffect(() => {
  //   if (posts?.resultCode === 0) {
  //     refetch()
  //   }
  // }, [])
  const getCurrentPostId = useCallback((id: string | null) => {
    setCurrentId(id)
  }, [])

  if (isLoadingPosts) return <Loader />

  return (
    <div className={s.container}>
      {hasDynamicPosts &&
        dynamicPosts?.map((el, index) => (
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
          />
        ))}
      {!hasDynamicPosts &&
        posts?.data?.items.map((el, index) => (
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
          />
        ))}
      {isSuccess && (
        <Loader
          isLoading={isLoading}
          isLastPage={hasDynamicPosts}
          loadMoreCallback={loadMoreCallback}
        />
      )}
    </div>
  )
})
