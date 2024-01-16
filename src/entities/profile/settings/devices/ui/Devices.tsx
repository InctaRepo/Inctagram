import React from 'react'

import s from '@/src/entities/profile/settings/devices/ui/devices.module.scss'
import { Button } from '@/src/shared/ui/button'
import { Typography } from '@/src/shared/ui/typography'

export const Devices = () => {
  return (
    <div className={s.device}>
      <div className={s.currentDeviceWrapper}>
        <Typography variant={'h3'}>Current device</Typography>
        <div className={s.browserWrapper}>
          <div className={s.browser}>
            <div className={s.img}>img</div>
            <div className={s.browserProperty}>
              <Typography variant={'bold16'}>Browser name</Typography>
              <Typography variant={'regular14'}>IP:</Typography>
            </div>
          </div>
        </div>
        <div className={s.btn}>
          <Button variant={'outlined'}>Terminate all other session</Button>
        </div>
      </div>
      <div className={s.activeSessionsWrapper}>
        <Typography variant={'h3'} className={s.activeSessions}>
          Active sessions
        </Typography>
        <div className={s.deviceWrapper}>
          <div className={s.deviceSession}>
            <div className={s.img}>img</div>
            <div className={s.deviceProperty}>
              <Typography variant={'bold16'}>Device name</Typography>
              <Typography variant={'regular14'}>IP:</Typography>
              <Typography variant={'small'}>Last visit:</Typography>
            </div>
          </div>
          <div className={s.logOut}>LogOut</div>
        </div>
      </div>
    </div>
  )
}
