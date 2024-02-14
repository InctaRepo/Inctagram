import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { setToken } from '@/features/auth/signIn'
import { RouteNames } from '@/shared/const'
import { useGetMeQuery } from '@/shared/hoc'
import { Loader } from '@/ui/loader'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const SuccessPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = router.query
  const [tokenStatus, setTokenStatus] = useState(false)
  const { data: user, isSuccess: isSuccessMe, isLoading } = useGetMeQuery()
  const userId = user?.data?.userId

  useEffect(() => {
    if (isSuccessMe && userId) {
      router.push(RouteNames.PROFILE + '/' + userId)
    }
  }, [tokenStatus])

  useEffect(() => {
    if (token !== undefined) {
      dispatch(setToken({ accessToken: token as string }))
      setTokenStatus(true)
    }
  }, [token!])
  if (isLoading) {
    return <Loader />
  }

  return <></>
}

SuccessPage.getLayout = getAuthLayout
export default SuccessPage
