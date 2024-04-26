import { ShowPostModal } from '@/entities/post/showPostModal'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetAllPostsQuery } from '@/features/posts'
import { ProfileHeader } from '@/features/publicPage/ui/publicPost/profileHeader'
import { formatPostCreatedAt } from '@/shared/lib'
import { Typography } from '@/ui/typography'

import s from '@/features/publicPage/ui/publicPost/publicPost.module.scss'

export const PublicPost = () => {
  const { data: postData } = useGetAllPostsQuery({})

  return (
    <div className={s.container}>
      {postData?.data.items.map(post => (
        <div className={s.box} key={post.id}>
          {Array.isArray(post.images) && post.images.length > 0 && <ShowPostModal data={post} />}
          <div className={s.profile_header}>
            <ProfileHeader userId={post.userId} />
          </div>
          <time className={s.time_online} suppressHydrationWarning>
            {formatPostCreatedAt(post.createdAt)}
          </time>
          <div className={s.disrciption}>
            <Typography className={s.text} color={'primary'} variant={'regular14'}>
              {post.description}
            </Typography>
            {post.description ? (
              <Typography color={'link'} variant={'sm_link'}>
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
