import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { ProfileInfo } from '@/src/entities/profile/profileInfo'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Posts } from '@/src/features/posts'
import { useGetProfileQuery } from '@/src/features/profile/service'
import s from '@/src/features/profile/ui/profile.module.scss'
import { resultCode, RouteNames } from '@/src/shared/const'
import { getIsAuth } from '@/src/shared/hoc'
import { useAppDispatch, useAppSelector } from '@/src/shared/hooks'
import { setProfileFound, Sidebar } from '@/src/shared/sidebar'
import { Loader } from '@/src/shared/ui/loader'

type Props = {
  id: string
  variant?: string
  postId?: string
}
//TODO нужен ли variant?

export const Profile = ({ id, postId, variant }: Props) => {
  const isAuth = useAppSelector(getIsAuth)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { data, isSuccess, isLoading, isFetching } = useGetProfileQuery(id)

  if (isSuccess && data?.resultCode === resultCode.NOT_FOUND && isAuth) {
    dispatch(setProfileFound(false))
    router.push(RouteNames.PROFILE_SETTINGS)

    return <Loader />
  }
  useEffect(() => {
    if (isFetching && data?.resultCode === resultCode.OK && isAuth) {
      router.push(RouteNames.HOME)
    }
  }, [])
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
