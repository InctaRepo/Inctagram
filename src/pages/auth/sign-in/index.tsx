import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { RouteNames } from '@/src/common/constants/route-names'
import { LoginForm } from '@/src/components/auth/login-form/login-form'
import { getAuthLayout } from '@/src/components/layout/auth-layout'
import { NextPageWithLayout } from '@/src/pages/_app'
import { useAppSelector } from '@/src/services'
import { useGetMeQuery, useLoginUserMutation } from '@/src/services/auth/auth-api'
import { LoginArgsType } from '@/src/services/auth/auth-api-types'
import { authIsAuthSelector } from '@/src/services/auth/auth-selectors'
import { useGetProfileQuery } from '@/src/services/profile/profileApi'

const SignInPage: NextPageWithLayout = () => {
  const [loginUser] = useLoginUserMutation()
  const isAuth = useAppSelector(authIsAuthSelector)
  const router = useRouter()
  const [errorServer, setErrorServer] = useState<string>('')
  const { data: user } = useGetMeQuery()
  const id = user?.data?.userId
  const { currentData } = useGetProfileQuery(id)

  useEffect(() => {
    if (!currentData?.data && isAuth) {
      router.push(RouteNames.PROFILE_SETTINGS)
    } else if (currentData?.data && isAuth) {
      router.push(RouteNames.MY_PROFILE)
    }
  }, [isAuth, router, currentData])

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
