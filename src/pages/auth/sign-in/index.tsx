import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { RouteNames } from '@/src/common/constants/route-names'
import { LoginForm } from '@/src/components/auth/login-form/login-form'
import { getAuthLayout } from '@/src/components/layout/auth-layout'
import { NextPageWithLayout } from '@/src/pages/_app'
import { useAppSelector } from '@/src/services'
import { useLoginUserMutation } from '@/src/services/auth/auth-api'
import { LoginArgsType } from '@/src/services/auth/auth-api-types'
import { authIsAuthSelector } from '@/src/services/auth/auth-selectors'

const SignInPage: NextPageWithLayout = () => {
  const [loginUser] = useLoginUserMutation()
  const isAuth = useAppSelector(authIsAuthSelector)
  const router = useRouter()
  const [errorServer, setErrorServer] = useState<string>('')

  useEffect(() => {
    if (isAuth) {
      router.push(RouteNames.MY_PROFILE)
    }
  }, [isAuth, router])

  const submit = (data: LoginArgsType) => {
    loginUser(data)
      .unwrap()
      .then(payload => {
        if (typeof payload.extensions[0]?.message === 'string') {
          setErrorServer(payload.extensions[0]?.message)
        }
        if (typeof payload.extensions[0]?.message !== 'string') {
          setErrorServer(payload.extensions[0]?.message[0].message)
        }
      })
  }

  return <LoginForm onSubmitHandler={submit} errorServer={errorServer} />
}

SignInPage.getLayout = getAuthLayout
export default SignInPage
