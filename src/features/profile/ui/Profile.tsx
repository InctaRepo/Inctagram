import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { ProfileInfo } from '@/src/entities/profile/profileInfo'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Posts, useGetUserPostQuery } from '@/src/features/posts'
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
  const { data, refetch } = useGetProfileQuery(id)

  const { data: postData } = useGetUserPostQuery(postId!)
  const { isLoading, loadMoreCallback, hasDynamicPosts, dynamicPosts, isLastPage } =
    useInfiniteScroll(postData)

  useEffect(() => {
    if (isAuth) {
      refetch()
    }
  }, [isAuth])

  /*useEffect(() => {
    if (!data?.data && isAuth) {
      router.push(RouteNames.PROFILE_SETTINGS)
    }
  }, [isAuth, router, data])
  if (isLoading)
    return (
      <Loader isLoading={isLoading} isLastPage={isLastPage} loadMoreCallback={loadMoreCallback} />
    )*/

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
