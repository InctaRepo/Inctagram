import React from 'react'

import s from '@/src/features/home/home.module.scss'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { Typography } from '@/src/shared/ui/typography'
import { getPublicLayout } from '@/src/widgets/layout/authLayout'

const OauthSuccessPage: NextPageWithLayout = () => {
  // useEffect(() => {
  //   window.location.assign(`https://inctagram.space/api/v1/oauth/github`)
  // }, [])

  return (
    <div className={s.container}>
      <div className={s.containerInfoPublic}>
        <Typography>OauthSuccessPage</Typography>
      </div>
    </div>
  )
}

OauthSuccessPage.getLayout = getPublicLayout
export default OauthSuccessPage
