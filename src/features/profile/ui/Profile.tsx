import { memo, useMemo } from 'react'

import { ProfileInfo } from '@/entities/profile/profileInfo'
import { useGetProfileQuery } from '@/entities/profile/service'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Posts } from '@/features/posts'
import { RouteNames, resultCode } from '@/shared/const'
import { getIsAuth } from '@/shared/hoc'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { Sidebar, setProfileFound } from '@/shared/sidebar'
import { Loader } from '@/ui/loader'
import { useRouter } from 'next/router'

import s from '@/features/profile/ui/profile.module.scss'

type Props = {
  id: string
  postId?: string
}

export const Profile = memo(({ id, postId }: Props) => {
  const isAuth = useAppSelector(getIsAuth)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { data, isLoading, isSuccess } = useGetProfileQuery(id)
  const userData = useMemo(() => {
    return data?.data
  }, [data?.data])

  if (isSuccess && data?.resultCode === resultCode.NOT_FOUND && isAuth) {
    dispatch(setProfileFound(false))
    router.push(RouteNames.PROFILE_SETTINGS)

    return <Loader />
  }
  // useEffect(() => {
  //   if (isFetching && data?.resultCode === resultCode.OK && isAuth) {
  //     dispatch(setProfileFound(true))
  //     router.push(RouteNames.HOME)
  //   }
  // }, [])
  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={s.container}>
      {isAuth && <Sidebar />}
      <div className={isAuth ? s.containerInfo : s.containerInfoPublic}>
        <ProfileInfo userData={userData} />
        <Posts postId={postId} userId={id} />
      </div>
    </div>
  )
})
