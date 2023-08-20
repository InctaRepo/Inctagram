import Link from 'next/link'

import s from '@/src/components/profile/profile-info/data-profile/data-profile.module.scss'
import { Button } from '@/src/components/ui/button'
import { Typography } from '@/src/components/ui/typography'
export const DataProfile = () => {
  return (
    <div>
      <div className={s.header}>
        <Typography variant="h1">URLProfile</Typography>
        <Button variant={'secondary'}>
          <Typography variant={'medium14'}>Profile Settings</Typography>
        </Button>
      </div>
      <div className={s.progressProfile}>
        <div className={s.info}>
          <Typography variant="bold14">2218</Typography>
          <Typography variant="regular14">Following</Typography>
        </div>
        <div className={s.info}>
          <Typography variant="bold14">2 358</Typography>
          <Typography variant="regular14">Followers</Typography>
        </div>
        <div className={s.info}>
          <Typography variant="bold14">2 764</Typography>
          <Typography variant="regular14">Publications</Typography>
        </div>
      </div>
      <div>
        <Typography variant="regular16">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          {/*<Link href={'/'} className={s.link}>*/}
          {/*  <Typography variant="regular16" className={s.text}>*/}
          {/*    ullamco laboris nisi ut aliquip ex ea commodo consequat.*/}
          {/*  </Typography>*/}
          {/*</Link>*/}
        </Typography>
      </div>
    </div>
  )
}
