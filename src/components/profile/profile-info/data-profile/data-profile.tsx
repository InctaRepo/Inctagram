import { router } from 'next/client'

import { useTranslate } from '@/src/assets/hooks/useTranslate'
import s from '@/src/components/profile/profile-info/data-profile/data-profile.module.scss'
import { Button } from '@/src/components/ui/button'
import { Typography } from '@/src/components/ui/typography'

export const DataProfile = () => {
  const { t } = useTranslate()

  return (
    <div>
      <div className={s.header}>
        <Typography variant="h1">URLProfile</Typography>
        <Button variant={'secondary'} onClick={() => router.push('/profile-setting')}>
          <Typography variant={'medium14'}>{t.profile.profileSettings}</Typography>
        </Button>
      </div>
      <div className={s.progressProfile}>
        <div className={s.info}>
          <Typography variant="bold14">2218</Typography>
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
      <div>
        <Typography variant="regular16">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        </Typography>
      </div>
    </div>
  )
}
