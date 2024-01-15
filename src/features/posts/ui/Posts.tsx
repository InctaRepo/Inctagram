import React, { memo } from 'react'

import { ShowPostModal } from '@/src/entities/post/showPostModal'
import { UserInfo } from '@/src/entities/profile/service'
import { useGetUserPostsQuery } from '@/src/features/posts'
import s from '@/src/features/posts/ui/posts.module.scss'
import { useInfiniteScroll } from '@/src/shared/hooks/ useInfiniteScroll'
import { Loader } from '@/src/shared/ui/loader'

type Props = {
  userData?: UserInfo
  postId?: string
  userId: string
}

export const Posts = memo(({ userData, postId, userId }: Props) => {
  const { data: posts, isLoading: isLoadingPosts } = useGetUserPostsQuery({ userId: userId })
  const { isLoading, loadMoreCallback, hasDynamicPosts, dynamicPosts, isLastPage } =
    useInfiniteScroll(posts?.data?.items!, userId)

  if (isLoadingPosts) return <Loader />

  return (
    <div className={s.container}>
      {hasDynamicPosts &&
        dynamicPosts?.map((el, index) => (
          <ShowPostModal
            description={el.description}
            key={index}
            images={el.images}
            id={el.id}
            createdAt={el.createdAt}
            userData={userData}
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
            userData={userData}
            postId={postId}
          />
        ))}
      <Loader isLoading={isLoading} isLastPage={isLastPage} loadMoreCallback={loadMoreCallback} />
    </div>
  )
})
