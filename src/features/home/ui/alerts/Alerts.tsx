import React, { ReactElement } from 'react'

import style from './alerts.module.scss'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetUsersCountQuery } from '@/features/posts'

export const Alerts = (): ReactElement => {
  const { data } = useGetUsersCountQuery()
  const totalCount = String((data as any)?.data?.totalCount || 0).padStart(6, '0')

  return (
    <div className={style.alerts}>
      <div className={style.text_wrapper}>Registered users:</div>
      <div className={style.navbar}>
        <div className={style.frame}>
          {String(totalCount)
            .split('')
            .map((digit, index) => (
              <React.Fragment key={index}>
                <div className={style.numer_wrapper}>{digit}</div>
                <div className={style.box}>
                  <div className={style.rectangle} />
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  )
}
