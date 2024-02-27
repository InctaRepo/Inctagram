import React, { memo } from 'react'

import { ShowPostModal } from '@/entities/post/showPostModal'
import { GetUserPostResponse, useGetUserPostsQuery } from '@/features/posts'
import s from '@/features/posts/ui/posts.module.scss'
import { useInfiniteScroll } from '@/shared/hooks'
import { Loader } from '@/ui/loader'

type Props = {
  postId?: string
  userId: string
}

export const Posts = memo(({ postId, userId }: Props) => {
  const { data: posts, isLoading: isLoadingPosts } = useGetUserPostsQuery({ userId: userId })
  const { isLoading, loadMoreCallback, hasDynamicPosts, dynamicPosts, isLastPage } =
    useInfiniteScroll(posts?.data?.items!, userId)

  if (isLoadingPosts) return <Loader />

  return (
    <div className={s.container}>
      {hasDynamicPosts &&
        dynamicPosts?.map((el: GetUserPostResponse, index: number) => (
          <ShowPostModal
            description={el.description}
            key={index}
            images={el.images}
            id={el.id}
            createdAt={el.createdAt}
            userId={userId}
            postId={postId}
          />
        ))}
      {!hasDynamicPosts &&
        posts?.data?.items.map((el, index) => (
          <ShowPostModal
            description={el.description}
            key={index}
            images={el.images}
            id={el.id}
            createdAt={el.createdAt}
            userId={userId}
            postId={postId}
          />
        ))}
      <Loader isLoading={isLoading} isLastPage={isLastPage} loadMoreCallback={loadMoreCallback} />
    </div>
  )
})
