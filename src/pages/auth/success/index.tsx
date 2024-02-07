import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { setToken } from '@/features/auth/signIn'
import { ThirdPartyAuthPage } from '@/features/auth/signIn/authByThirdParty'
import { Typography } from '@/ui/typography'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const SuccessPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = router.query
  const [tokenStatus, setTokenStatus] = useState(false)

  useEffect(() => {
    if (token) {
      dispatch(setToken({ accessToken: token as string }))
      setTokenStatus(true)
    }
  }, [token])

  return tokenStatus ? (
    <ThirdPartyAuthPage></ThirdPartyAuthPage>
  ) : (
    <Typography variant={'h3'}>Loading...</Typography>
  )
}

SuccessPage.getLayout = getAuthLayout
export default SuccessPage
