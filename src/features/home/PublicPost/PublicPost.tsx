import React, { ReactElement } from 'react'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import Image from 'next/image'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetAllPostsQuery } from '../../posts'

import { formatPostCreatedAt } from './formatCreatetDate'
import { PostImages } from './PostImages/PostImages'
import { ProfileHeader } from './ProfileHeader/ProfileHeader'
import style from './PublicPost.module.scss'

import { Typography } from '@/src/shared/ui/typography'

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
  const avatarOwner = undefined

  return (
    <div className={style.container}>
      {postData.data.items.map(post => (
        <div key={post.id} className={style.box}>
          {/* <PostImages
            images={(post.images as unknown as { url: string }[]).map(image => image.url)}
          /> */}
          {Array.isArray(post.images) && post.images.length > 0 && (
            <Image
              src={(post.images[0] as unknown as { url: string }).url}
              alt="content"
              width={232}
              height={240}
            />
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
