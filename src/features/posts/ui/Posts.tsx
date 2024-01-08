import React, { memo } from 'react'

import { ShowPostModal } from '@/src/entities/post/showPostModal'
import { useGetUserPostsQuery } from '@/src/features/posts'
import s from '@/src/features/posts/ui/posts.module.scss'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profileSettings/service'
import { useInfiniteScroll } from '@/src/shared/hooks/ useInfiniteScroll'
import { Loader } from '@/src/shared/ui/loader'

type Props = {
  userData?: UserInfo
  variant?: string
  postId?: string
  userId: string
}

export const Posts = memo(({ userData, postId, userId, variant }: Props) => {
  const { data: posts, isLoading: isLoadingPosts } = useGetUserPostsQuery({ userId: userId })
  const { isLoading, loadMoreCallback, hasDynamicPosts, dynamicPosts, isLastPage } =
    useInfiniteScroll(posts?.data?.items!, userId)

  if (isLoadingPosts) return <Loader />

  return (
    <div className={s.container}>
      {hasDynamicPosts &&
        dynamicPosts?.map((el, index) => (
          <ShowPostModal
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
      <Loader isLoading={isLoading} isLastPage={isLastPage} loadMoreCallback={loadMoreCallback} />
    </div>
  )
})
