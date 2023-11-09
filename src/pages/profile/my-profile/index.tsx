import { GetServerSideProps } from 'next'

import { getProfileLayout } from '@/src/components/layout/profile-layout'
import { Profile } from '@/src/components/profile'
import { NextPageWithLayout } from '@/src/pages/_app'
import { BaseResponseType, useAppSelector } from '@/src/services'
import { UserInfoType } from '@/src/services/profile/profile-api-types'

export const getServerSideProps: GetServerSideProps = async () => {
  /*const { data: user } = useGetMeQuery()
  const id = user?.data?.userId
const data = await fetch('https://inctagram.space/api/v1/users/profile/${id}')
const profile = await data.json()
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
  /* profile: BaseResponseType<UserInfoType>*/
  name: string
}

const MyProfilePage: NextPageWithLayout = props => {
  console.log(props)

  return <Profile /*userData={profile?.data}*/ />
}

MyProfilePage.getLayout = getProfileLayout
export default MyProfilePage
