import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { ProfileInfo } from '@/src/entities/profile/profileInfo'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Posts } from '@/src/features/posts'
import { useGetProfileQuery } from '@/src/features/profile/service'
import { RouteNames } from '@/src/shared/const/routeNames'
import { getIsAuth } from '@/src/shared/hoc'
import { useAppSelector } from '@/src/shared/hooks'
import { Sidebar } from '@/src/shared/sidebar'
import { Loader } from '@/src/shared/ui/loader'
import s from 'src/features/profile/ui/profile.module.scss'

type Props = {
  id: string
  variant?: string
  postId?: string
}
//TODO нужен ли variant?

export const Profile = ({ id, postId, variant }: Props) => {
  const isAuth = useAppSelector(getIsAuth)
  const router = useRouter()
  const { data, refetch, isSuccess, isLoading } = useGetProfileQuery(id)

  useEffect(() => {
    if (data?.resultCode === 0) {
      refetch()
    }
  }, [])
  if (isSuccess && data?.resultCode === 5 && isAuth) {
    router.push(RouteNames.PROFILE_SETTINGS)
    console.log()

    return <Loader />
  }
  if (isLoading) return <Loader />

  return (
    <div className={s.container}>
      {isAuth && <Sidebar />}
      <div className={isAuth ? s.containerInfo : s.containerInfoPublic}>
        <ProfileInfo userData={data?.data} />
        <Posts userData={data?.data} postId={postId} variant={variant} userId={id} />
      </div>
    </div>
  )
}
