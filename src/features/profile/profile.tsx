// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { router } from 'next/client'
import { useEffect } from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { getIsAuth } from '@/src/features/auth/authService'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { useGetProfileQuery } from '@/src/features/profile/service/profileApi'
import { RouteNames } from '@/src/shared/const/routeNames'
import { useAppSelector } from '@/src/shared/hooks'
import { Sidebar } from '@/src/shared/sidebar'
import { AppLoader } from '@/src/shared/ui/appLoader'
import { ListImage } from '../profile/listImage'
import { ProfileInfo } from '../profile/profileInfo'
import s from './profile.module.scss'

type Props = {
  id: string
}

export const Profile = ({ id }: Props) => {
  const isAuth = useAppSelector(getIsAuth)
  const { data, isSuccess, isLoading } = useGetProfileQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  })

  useEffect(() => {
    if (isSuccess && !data?.data) {
      router.push(RouteNames.PROFILE_SETTINGS)
    }
  }, [router, data, isSuccess])

  if (isLoading) return <AppLoader />

  return (
    <div className={s.container}>
      {isAuth && <Sidebar />}
      <div className={isAuth ? s.containerInfo : s.containerInfoPublic}>
        <ProfileInfo id={id} userData={data?.data} />
        <ListImage userData={data?.data} />
      </div>
    </div>
  )
}
