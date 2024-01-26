import { useRouter } from 'next/router'

import { ProfileInfo } from '@/entities/profile/profileInfo'
import { useGetProfileQuery } from '@/entities/profile/service'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Posts } from '@/features/posts'
import s from '@/features/profile/ui/profile.module.scss'
import { resultCode, RouteNames } from '@/shared/const'
import { getIsAuth } from '@/shared/hoc'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { setProfileFound, Sidebar } from '@/shared/sidebar'
import { Loader } from '@/ui/loader'

type Props = {
  id: string
  postId?: string
}

export const Profile = ({ id, postId }: Props) => {
  const isAuth = useAppSelector(getIsAuth)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { data, isSuccess, isLoading } = useGetProfileQuery(id)

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
  if (isLoading) return <Loader />

  return (
    <div className={s.container}>
      {isAuth && <Sidebar />}
      <div className={isAuth ? s.containerInfo : s.containerInfoPublic}>
        <ProfileInfo userData={data?.data} />
        <Posts userData={data?.data} postId={postId} userId={id} />
      </div>
    </div>
  )
}
