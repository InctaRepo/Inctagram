import React from 'react'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetUsersCountQuery } from '@/features/posts'

import s from '@/features/publicPage/ui/alerts/alerts.module.scss'

export const Alerts = () => {
  const { data } = useGetUsersCountQuery()
  const totalCount = String(data?.data?.totalCount || 0).padStart(6, '0')

  return (
    <div className={s.alerts}>
      <div className={s.text_wrapper}>Registered users:</div>
      <div className={s.navbar}>
        <div className={s.frame}>
          {String(totalCount)
            .split('')
            .map((digit, index) => (
              <React.Fragment key={index}>
                <div className={s.numer_wrapper}>{digit}</div>
                <div className={s.box}>
                  <div className={s.rectangle} />
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  )
}
