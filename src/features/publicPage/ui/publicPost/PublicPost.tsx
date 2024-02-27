import { ShowPostModal } from '@/entities/post/showPostModal'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetAllPostsQuery } from '@/features/posts'
import { ProfileHeader } from '@/features/publicPage/ui/publicPost/profileHeader'
import s from '@/features/publicPage/ui/publicPost/publicPost.module.scss'
import { formatPostCreatedAt } from '@/shared/lib'
import { Typography } from '@/ui/typography'

export const PublicPost = () => {
  const { data: postData } = useGetAllPostsQuery({})

  return (
    <div className={s.container}>
      {postData?.data.items.map(post => (
        <div key={post.id} className={s.box}>
          {Array.isArray(post.images) && post.images.length > 0 && (
            <ShowPostModal
              userId={post.userId}
              description={post.description}
              images={post.images}
              id={post.id}
            />
          )}
          <div className={s.profile_header}>
            <ProfileHeader userId={post.userId} />
          </div>
          <div className={s.time_online}>{formatPostCreatedAt(post.createdAt)}</div>
          <div className={s.disrciption}>
            <Typography color="primary" variant="regular14" className={s.text}>
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
