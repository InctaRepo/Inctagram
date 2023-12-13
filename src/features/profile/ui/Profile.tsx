import { useEffect } from 'react'

import { ProfileInfo } from '@/src/entities/profile/profileInfo'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Posts, useGetUserPostQuery } from '@/src/features/posts'
import { useGetProfileQuery } from '@/src/features/profile/service'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { getIsAuth } from '@/src/shared/hoc'
import { useAppSelector, useInfiniteScroll } from '@/src/shared/hooks'
import { Sidebar } from '@/src/shared/sidebar'
import s from 'src/features/profile/ui/profile.module.scss'

type Props = {
  id: string
  variant?: string
  postId?: string
}

export const Profile = ({ id, postId, variant }: Props) => {
  const isAuth = useAppSelector(getIsAuth)
  const { data } = useGetProfileQuery(id)
  const { data: postData } = useGetUserPostQuery(postId!)
  const { isLoading, loadMoreCallback, hasDynamicPosts, dynamicPosts, isLastPage } =
    useInfiniteScroll(postData)

  return (
    <div className={s.container}>
      {isAuth && <Sidebar />}
      <div className={isAuth ? s.containerInfo : s.containerInfoPublic}>
        <ProfileInfo userData={data?.data} />
        <Posts
          userData={data?.data}
          postId={postId}
          variant={variant}
          postData={hasDynamicPosts ? dynamicPosts : postData?.data}
          isLoading={isLoading}
          loadMoreCallback={loadMoreCallback}
          isLastPage={isLastPage}
        />
      </div>
    </div>
  )
}
