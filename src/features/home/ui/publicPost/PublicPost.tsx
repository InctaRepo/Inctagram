import { ShowPostModal } from '@/entities/post/showPostModal'
import { ProfileHeader } from '@/features/home/ui/publicPost/profileHeader'
import s from '@/features/home/ui/publicPost/publicPost.module.scss'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetAllPostsQuery } from '@/features/posts'
import { formatPostCreatedAt } from '@/shared/lib'
import { Typography } from '@/ui/typography'

export const PublicPost = () => {
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
    <div className={s.container}>
      {postData.data.items.map(post => (
        <div key={post.id} className={s.box}>
          {/* <PostImages
            images={(post.images as unknown as { url: string }[]).map(image => image.url)}
          /> */}
          {Array.isArray(post.images) && post.images.length > 0 && (
            <ShowPostModal
              userId={post.userId}
              description={post.description}
              images={post.images}
              id={post.id}
            />
            // <Posts
            //   userId={post.userId}
            //   description={post.description}
            //   images={post.images[0]}
            //   postId={post.id as unknown as string}
            // />
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
