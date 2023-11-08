import { useEffect } from 'react'

import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { RouteNames } from '@/src/common/constants/route-names'
import { getProfileLayout } from '@/src/components/layout/profile-layout'
import { Profile } from '@/src/components/profile'
import { NextPageWithLayout } from '@/src/pages/_app'
import { BaseResponseType, useAppSelector } from '@/src/services'
import { authIsAuthSelector } from '@/src/services/auth/auth-selectors'
import { ProfileAPI } from '@/src/services/profile/profile-api'
import { UserInfoType } from '@/src/services/profile/profile-api-types'

export const getServerSideProps: GetServerSideProps = async () => {
  /* const data = ProfileAPI.endpoints.getProfile

  if (!data) {
    return {
      notFound: true,
    }
  }*/

  return {
    props: {
      name: 'Elena',
    },
  }
}

type PropsType = {
  /* data: BaseResponseType<UserInfoType>*/
  name: string
}

const MyProfilePage: NextPageWithLayout = (props: PropsType) => {
  const { name } = props
  const isAuth = useAppSelector(authIsAuthSelector)
  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return isAuth && <div></div> /*<Profile userData={data?.data} />*/
}

MyProfilePage.getLayout = getProfileLayout
export default MyProfilePage
