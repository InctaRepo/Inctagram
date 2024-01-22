import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { SingInParams, useSignInMutation } from '@/src/features/auth/signIn/authByEmail'
import { LoginForm } from '@/src/features/auth/signIn/ui/loginForm'
import { resultCode, RouteNames } from '@/src/shared/const'
import { useGetMeQuery } from '@/src/shared/hoc'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'

export const SignIn: NextPageWithLayout = () => {
  const [loginUser, { data: loginData, isSuccess }] = useSignInMutation()
  const router = useRouter()
  const [errorServer, setErrorServer] = useState<string>('')
  const { data: user, isSuccess: isSuccessMe } = useGetMeQuery()
  const userId = user?.data?.userId!

  useEffect(() => {
    if (isSuccess && isSuccessMe && userId && loginData?.resultCode === resultCode.OK) {
      router.push(RouteNames.PROFILE + '/' + userId)
    }
  }, [isSuccess, isSuccessMe, userId, errorServer])
  const submit = (data: SingInParams) => {
    setErrorServer('')
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
