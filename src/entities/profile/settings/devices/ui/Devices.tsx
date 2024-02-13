import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import {
  useDeleteAllSessionsMutation,
  useDeleteThisSessionsMutation,
  useGetSessionsQuery,
} from '@/entities/profile/settings/devices/service'
import { Device } from '@/entities/profile/settings/devices/service/deviceApiTypes'
import s from '@/entities/profile/settings/devices/ui/devices.module.scss'
import Chrome from '@/public/icon/chromeIcon.svg'
import Phone from '@/public/icon/phoneIcon.svg'
import { LogoutIcon } from '@/shared/assets/icons/LogoutIcon'
import { resultCode, RouteNames } from '@/shared/const'
import { useTranslate } from '@/shared/hooks'
import { Button } from '@/ui/button'
import { Loader } from '@/ui/loader'
import { Typography } from '@/ui/typography'

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
  }, [sessions?.resultCode])
  if (isLoading) return <Loader />

  return (
    <>
      {sessions?.data && (
        <div className={s.device}>
          <div className={s.currentDeviceWrapper}>
            <Typography variant={'h3'} className={s.currentDevice}>
              {t.profileSetting.devices.currentDevice}
            </Typography>
            <div className={s.browserWrapper}>
              <div className={s.browser}>
                <div className={s.img}>
                  {sessions?.data[0].deviceName.trim() === 'Chrome,Windows 10' && <Chrome />}
                  {sessions?.data[0].deviceName.trim() === 'Microsoft Edge,Windows 10' && (
                    <Chrome />
                  )}
                  {sessions?.data[0].deviceName.trim() === 'Chrome,GNU/Linux' && <Phone />}
                </div>
                <div className={s.browserProperty}>
                  <Typography variant={'bold16'}>{sessions?.data[0].deviceName}</Typography>
                  <Typography variant={'regular14'}>IP:{sessions?.data[0].ip}</Typography>
                </div>
              </div>
            </div>
            <div className={s.btn}>
              <Button variant={'outlined'} onClick={deleteAllSessionsHandler}>
                {t.profileSetting.devices.terminateAllOtherSession}
              </Button>
            </div>
          </div>
          <div className={s.activeSessionsWrapper}>
            <Typography variant={'h3'} className={s.activeSessions}>
              {t.profileSetting.devices.activeSessions}
            </Typography>
            {sessions?.data?.map((el: Device) => (
              <div key={el.deviceId} className={s.deviceWrapper}>
                <div className={s.deviceSession}>
                  <div className={s.img}>
                    {el.deviceName.trim() === 'Chrome,Windows 10' && <Chrome />}
                    {el.deviceName.trim() === 'Microsoft Edge,Windows 10' && <Chrome />}
                    {el.deviceName.trim() === 'Chrome,GNU/Linux' && <Phone />}
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
                  variant={'link'}
                  className={s.logOut}
                  onClick={() => deleteSession(el.deviceId)}
                >
                  <Typography variant="medium14" className={s.text}>
                    <LogoutIcon fill={'current'} />
                    {t.sidebar.logout}
                  </Typography>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
