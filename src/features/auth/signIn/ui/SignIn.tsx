import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { setId } from '@/features/auth/signIn'
import { SingInParams, useSignInMutation } from '@/features/auth/signIn/authByEmail'
import { LoginForm } from '@/features/auth/signIn/ui/loginForm'
import { resultCode, RouteNames } from '@/shared/const'
import { useGetMeQuery } from '@/shared/hoc'
import { useAppDispatch } from '@/shared/hooks'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'

export const SignIn: NextPageWithLayout = () => {
  const dispatch = useAppDispatch()
  const [loginUser, { data: loginData, isSuccess }] = useSignInMutation()
  const router = useRouter()
  const [errorServer, setErrorServer] = useState<string>('')
  const { data: user, isSuccess: isSuccessMe } = useGetMeQuery()
  const userId = user?.data?.userId!

  useEffect(() => {
    if (isSuccess && isSuccessMe && userId && loginData?.resultCode === resultCode.OK) {
      router.push(RouteNames.PROFILE + '/' + userId)
      dispatch(setId({ id: userId }))
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
