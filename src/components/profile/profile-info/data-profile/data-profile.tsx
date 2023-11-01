import { useRouter } from 'next/router'

import s from './data-profile.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { Button } from '@/src/components/ui/button'
import { Typography } from '@/src/components/ui/typography'
import { UserInfoType } from '@/src/services/profile/profile-api-types'

type DataProfileType = {
  userData?: UserInfoType
}
export const DataProfile = ({ userData }: DataProfileType) => {
  const { push } = useRouter()

  const { t } = useTranslate()

  return (
    <>
      <div className={s.header}>
        <Typography variant="h1">{userData?.username}</Typography>
        <Button
          variant={'secondary'}
          className={s.button}
          onClick={() => push('/profile/settings')}
        >
          <Typography variant={'h3'}>{t.profile.profileSettings}</Typography>
        </Button>
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
