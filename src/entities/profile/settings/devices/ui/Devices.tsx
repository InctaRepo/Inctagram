import React, { useEffect } from 'react'

import { DevicesIconSelection } from '@/entities/profile/settings/devices/lib/devicesIconSelection'
import {
  useDeleteAllSessionsMutation,
  useDeleteThisSessionsMutation,
  useGetSessionsQuery,
} from '@/entities/profile/settings/devices/service'
import { Device } from '@/entities/profile/settings/devices/service/deviceApiTypes'
import Chrome from '@/public/icon/chromeIcon.svg'
import Phone from '@/public/icon/phoneIcon.svg'
import { LogoutIcon } from '@/shared/assets/icons/LogoutIcon'
import { RouteNames, resultCode } from '@/shared/const'
import { useTranslate } from '@/shared/hooks'
import { Button } from '@/ui/button'
import { Loader } from '@/ui/loader'
import { Typography } from '@/ui/typography'
import { useRouter } from 'next/router'

import s from '@/entities/profile/settings/devices/ui/devices.module.scss'

export const Devices = () => {
  const { t } = useTranslate()
  const router = useRouter()
  const { data: sessions, isLoading } = useGetSessionsQuery()
  const [deleteAllSessions, {}] = useDeleteAllSessionsMutation()
  const [deleteSession, {}] = useDeleteThisSessionsMutation()
  const deleteAllSessionsHandler = () => {
    deleteAllSessions()
  }

  useEffect(() => {
    if (sessions?.resultCode == resultCode.UNAUTHORIZED) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [router, sessions?.resultCode])
  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {sessions && (
        <div className={s.device}>
          <div className={s.currentDeviceWrapper}>
            <Typography className={s.currentDevice} variant={'h3'}>
              {t.profileSetting.devices.currentDevice}
            </Typography>
            <div className={s.browserWrapper}>
              <div className={s.browser}>
                <div className={s.img}>
                  {DevicesIconSelection(sessions?.data[0].deviceName.trim()) === 'PC' && <Chrome />}
                  {DevicesIconSelection(sessions?.data[0].deviceName.trim()) === 'Phone' && (
                    <Phone />
                  )}
                </div>
                <div className={s.browserProperty}>
                  <Typography variant={'bold16'}>{sessions?.data[0].deviceName}</Typography>
                  <Typography variant={'regular14'}>IP:{sessions?.data[0].ip}</Typography>
                </div>
              </div>
            </div>
            {sessions?.data?.slice(1).length != 0 && (
              <div className={s.btn}>
                <Button onClick={deleteAllSessionsHandler} variant={'outlined'}>
                  {t.profileSetting.devices.terminateAllOtherSession}
                </Button>
              </div>
            )}
          </div>
          <div className={s.activeSessionsWrapper}>
            <Typography className={s.activeSessions} variant={'h3'}>
              {t.profileSetting.devices.activeSessions}
            </Typography>
            {sessions?.data?.slice(1).map((el: Device) => (
              <div className={s.deviceWrapper} key={el.deviceId}>
                <div className={s.deviceSession}>
                  <div className={s.img}>
                    {DevicesIconSelection(el.deviceName.trim()) === 'PC' && <Chrome />}
                    {DevicesIconSelection(el.deviceName.trim()) === 'Phone' && <Phone />}
                  </div>
                  <div className={s.deviceProperty}>
                    <Typography variant={'bold16'}>{el.deviceName}</Typography>
                    <Typography variant={'regular14'}>IP:{el.ip}</Typography>
                    <Typography variant={'small'}>
                      {t.profileSetting.devices.lastVisit}:
                      {new Date(el.lastVisit).toLocaleString('en-US', { hour12: false })}
                    </Typography>
                  </div>
                </div>
                <Button
                  className={s.logOut}
                  onClick={() => deleteSession(el.deviceId)}
                  variant={'link'}
                >
                  <Typography className={s.text} variant={'medium14'}>
                    <LogoutIcon fill={'current'} />
                    {t.sidebar.logout}
                  </Typography>
                </Button>
              </div>
            ))}
            {sessions?.data?.slice(1).length === 0 && (
              <Typography className={s.otherDevices} variant={'h1'}>
                {t.profileSetting.devices.otherDevices}
              </Typography>
            )}
          </div>
        </div>
      )}
    </>
  )
}
