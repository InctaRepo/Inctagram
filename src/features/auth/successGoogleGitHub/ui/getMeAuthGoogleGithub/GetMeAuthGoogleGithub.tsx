import { useRouter } from 'next/router'

import { RouteNames } from '@/shared/const'
import { useGetMeQuery } from '@/shared/hoc'

export const GetMeAuthGoogleGithub = () => {
  const { data: user, isSuccess: isSuccessMe } = useGetMeQuery()
  const userId = user?.data?.userId
  const router = useRouter()

  if (isSuccessMe && userId) {
    router.push(RouteNames.PROFILE + '/' + userId)
  }

  return <></>
}
