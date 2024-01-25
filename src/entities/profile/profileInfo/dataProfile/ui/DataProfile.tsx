import React from 'react'

import { useRouter } from 'next/router'

import s from '@/entities/profile/profileInfo/dataProfile/ui/dataProfile.module.scss'
import { UserInfo } from '@/entities/profile/service'
import { RouteNames } from '@/shared/const'
import { getIsAuth } from '@/shared/hoc'
import { useAppSelector, useTranslate } from '@/shared/hooks'
import { Button } from '@/ui/button'
import { Typography } from '@/ui/typography'

type Props = {
  userData?: UserInfo
}
export const DataProfile = ({ userData }: Props) => {
  const { push } = useRouter()
  const isAuth = useAppSelector(getIsAuth)
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
