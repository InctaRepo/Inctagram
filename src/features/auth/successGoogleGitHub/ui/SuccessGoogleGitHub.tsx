import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setToken } from '@/features/auth/signIn'
import { GetMeAuthGoogleGithub } from '@/features/auth/successGoogleGitHub/ui/getMeAuthGoogleGithub'
import { Loader } from '@/ui/loader'
import { useRouter } from 'next/router'

export const SuccessGoogleGitHub = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = router.query
  const [tokenStatus, setTokenStatus] = useState(false)

  useEffect(() => {
    if (token) {
      dispatch(setToken({ accessToken: token as string }))
      setTokenStatus(true)
    }
  }, [dispatch, token])

  return tokenStatus ? <GetMeAuthGoogleGithub /> : <Loader />
}
