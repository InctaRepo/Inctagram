import React, { ReactElement, useEffect, useState } from 'react'

import { formatPostCreatedAt } from './formatCreatetDate'
import { PostImages } from './PostImages/PostImages'
import { ProfileHeader } from './ProfileHeader/ProfileHeader'
import style from './PublicPost.module.scss'

import { ShowPostModal } from '@/entities/post/showPostModal'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Posts, useGetAllPostsQuery } from '@/features/posts'
import { Typography } from '@/ui/typography'

export const PublicPost = (): ReactElement => {
  const {
    data: postData,
    isLoading,
    isError,
  } = useGetAllPostsQuery({
    pageSize: 4,
    pageNumber: 1,
    sortDirection: 'desc',
  })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !postData?.data?.items) {
    return <div>Error loading data</div>
  }

  return (
    <div className={style.container}>
      {postData.data.items.map(post => (
        <div key={post.id} className={style.box}>
          {/* <PostImages
            images={(post.images as unknown as { url: string }[]).map(image => image.url)}
          /> */}
          {Array.isArray(post.images) && post.images.length > 0 && (
            <ShowPostModal
              userId={post.userId}
              // callBack={getCurrentPostId}
              description={post.description}
              // key={index}
              images={post.images}
              id={post.id as unknown as string}
              postId={post.id as unknown as string}
              variant={post.images[0].variant}
            />
            // <Posts
            //   userId={post.userId}
            //   description={post.description}
            //   images={post.images[0]}
            //   postId={post.id as unknown as string}
            // />
          )}
          <div className={style.profile_header}>
            <ProfileHeader userId={post.userId} />
          </div>
          <div className={style.time_online}>{formatPostCreatedAt(post.createdAt)}</div>
          <div className={style.disrciption}>
            <Typography color="primary" variant="regular14" className={style.text}>
              {post.description}
            </Typography>
            {post.description ? (
              <Typography variant="sm_link" color="link">
                Show more
              </Typography>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
