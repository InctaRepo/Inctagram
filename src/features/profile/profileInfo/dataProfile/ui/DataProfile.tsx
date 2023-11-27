import { useRouter } from 'next/router'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { authIsAuthSelector } from '@/src/features/auth/authService'
import { RouteNames } from '@/src/shared/const/routeNames'
import { useAppSelector } from '@/src/shared/hooks'
import { useTranslate } from '@/src/shared/hooks/useTranslate'
import { Button } from '@/src/shared/ui/button'
import { Typography } from '@/src/shared/ui/typography'
import { UserInfo } from '../../../service/profileApiTypes'
import s from './dataProfile.module.scss'

type Props = {
  userData?: UserInfo
}
export const DataProfile = ({ userData }: Props) => {
  const { push } = useRouter()
  const isAuth = useAppSelector(authIsAuthSelector)
  const { t } = useTranslate()

  return (
    <>
      <div className={s.header}>
        <Typography variant="h1">{userData?.username}</Typography>
        {isAuth && (
          <Button
            variant={'secondary'}
            className={s.button}
            onClick={() => push(RouteNames.PROFILE_SETTINGS)}
          >
            <Typography variant={'h3'}>{t.profile.profileSettings}</Typography>
          </Button>
        )}
      </div>
      <div className={s.progressProfile}>
        <div className={s.info}>
          <Typography variant="bold14">1231</Typography>
          <Typography variant="regular14">{t.profile.subscriptions}</Typography>
        </div>
        <div className={s.info}>
          <Typography variant="bold14">2 358</Typography>
          <Typography variant="regular14">{t.profile.subscribers}</Typography>
        </div>
        <div className={s.info}>
          <Typography variant="bold14">2 764</Typography>
          <Typography variant="regular14">{t.profile.publications}</Typography>
        </div>
      </div>
      <div className={s.text}>
        <Typography variant="regular16">{userData?.aboutMe}</Typography>
      </div>
    </>
  )
}
