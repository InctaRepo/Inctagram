import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { ProfileInfo } from '@/src/entities/profile/profileInfo'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Posts, useGetUserPostQuery, useGetUserPostsQuery } from '@/src/features/posts'
import { useGetProfileQuery } from '@/src/features/profile/service'
import { RouteNames } from '@/src/shared/const/routeNames'
import { getIsAuth } from '@/src/shared/hoc'
import { useAppSelector, useInfiniteScroll } from '@/src/shared/hooks'
import { Sidebar } from '@/src/shared/sidebar'
import { Loader } from '@/src/shared/ui/loader'
import s from 'src/features/profile/ui/profile.module.scss'

type Props = {
  id: string
  variant?: string
  postId?: string
}

export const Profile = ({ id, postId, variant }: Props) => {
  const isAuth = useAppSelector(getIsAuth)
  const router = useRouter()
  const { data, isSuccess } = useGetProfileQuery(id)

  const { data: posts } = useGetUserPostsQuery(data?.data.userId)

  if (!posts) {
    return null
  }
  const { isLoading, loadMoreCallback, hasDynamicPosts, dynamicPosts, isLastPage } =
    useInfiniteScroll(posts.data.items)

  // useEffect(() => {
  //   if (data?.resultCode === 0) {
  //     refetch()
  //   }
  // }, [])

  /*if (isSuccess && data?.resultCode === 5 && isAuth) {
    router.push(RouteNames.PROFILE_SETTINGS)

    return <Loader />
  }
  if (isLoading) return <Loader />*/

  return (
    <div className={s.container}>
      {isAuth && <Sidebar />}
      <div className={isAuth ? s.containerInfo : s.containerInfoPublic}>
        <ProfileInfo userData={data?.data} />
        <Posts
          userData={data?.data}
          postId={postId}
          variant={variant}
          posts={hasDynamicPosts ? dynamicPosts : posts?.data.items}
          isLoading={isLoading}
          loadMoreCallback={loadMoreCallback}
          isLastPage={isLastPage}
        />
      </div>
    </div>
  )
}
//TODO нужен ли variant?
