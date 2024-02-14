import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { setToken, ThirdPartyAuthPage } from '@/features/auth/signIn'
import { Loader } from '@/ui/loader'
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

  return tokenStatus ? <ThirdPartyAuthPage /> : <Loader />
}

SuccessPage.getLayout = getAuthLayout
export default SuccessPage
