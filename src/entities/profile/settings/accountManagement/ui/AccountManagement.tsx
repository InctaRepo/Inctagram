import React from 'react'

import Chrome from '@/public/icon/chromeIcon.svg'
import Phone from '@/public/icon/phoneIcon.svg'
import s from '@/src/entities/profile/settings/accountManagement/ui/accountManagement.module.scss'
import {
  useDeleteAllSessionsMutation,
  useDeleteThisSessionsMutation,
  useGetSessionsQuery,
} from '@/src/entities/profile/settings/devices/service'
import { Device } from '@/src/entities/profile/settings/devices/service/deviceApiTypes'
import { LogoutIcon } from '@/src/shared/assets/icons/LogoutIcon'
import { useTranslate } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui/button'
import { RadioButton } from '@/src/shared/ui/radioButton'
import { Typography } from '@/src/shared/ui/typography'

type Props = {}
export const AccountManagement = ({}: Props) => {
  const { t } = useTranslate()
  const { data: sessions } = useGetSessionsQuery()
  const [deleteAllSessions, {}] = useDeleteAllSessionsMutation()
  const [deleteSession, {}] = useDeleteThisSessionsMutation()
  const deleteAllSessionsHandler = () => {
    deleteAllSessions()
  }

  return (
    <>
      <div className={s.accountManagement}>
        <div className={s.accountTypeWrapper}>
          <Typography variant={'h3'}>{t.profileSetting.accountManagement.accountType}</Typography>
          <div className={s.browserWrapper}>
            <div className={s.browser}>
              <div className={s.browserProperty}>
                <RadioButton value={'true'} label={'fdsadvfsdfvfdsvdf'} />
                <RadioButton value={'false'} label={'22222'} />
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
    </>
  )
}
