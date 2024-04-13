import React, { memo } from 'react'

import { ShowPostModal } from '@/entities/post/showPostModal'
import { GetUserPostResponse, useGetUserPostsQuery } from '@/features/posts'
import { useInfiniteScroll } from '@/shared/hooks'
import { Loader } from '@/ui/loader'

import s from '@/features/posts/ui/posts.module.scss'

type Props = {
  postId?: string
  userId: string
}

export const Posts = memo(({ postId, userId }: Props) => {
  const { data: posts, isLoading: isLoadingPosts } = useGetUserPostsQuery({ userId: userId })
  const { dynamicPosts, hasDynamicPosts, isLastPage, isLoading, loadMoreCallback } =
    useInfiniteScroll(posts?.data?.items!, userId)

  if (isLoadingPosts) {
    return <Loader />
  }

  return (
    <div className={s.container}>
      {hasDynamicPosts &&
        dynamicPosts?.map((el: GetUserPostResponse, index: number) => (
          <ShowPostModal
            createdAt={el.createdAt}
            description={el.description}
            id={el.id}
            images={el.images}
            key={index}
            postId={postId}
            userId={userId}
          />
        ))}
      {!hasDynamicPosts &&
        posts?.data?.items.map((el, index) => (
          <ShowPostModal
            createdAt={el.createdAt}
            description={el.description}
            id={el.id}
            images={el.images}
            key={index}
            postId={postId}
            userId={userId}
          />
        ))}
      <Loader isLastPage={isLastPage} isLoading={isLoading} loadMoreCallback={loadMoreCallback} />
    </div>
  )
})
