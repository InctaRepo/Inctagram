import { useState } from 'react'

import { useRouter } from 'next/router'

import { SingInParams, useSignInMutation } from '../authByEmail'

import { LoginForm } from './loginForm'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { RouteNames } from '@/src/shared/const/routeNames'
import { useGetMeQuery } from '@/src/shared/hoc'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { Loader } from '@/src/shared/ui/loader'

export const SignIn: NextPageWithLayout = () => {
  const [loginUser, { isLoading, isSuccess }] = useSignInMutation()
  const router = useRouter()
  const [errorServer, setErrorServer] = useState<string>('')
  const { data: user, isLoading: isLoadingMe, isSuccess: isSuccessMe } = useGetMeQuery()
  const userId = user?.data?.userId!

  if (isSuccess && isSuccessMe && userId) {
    router.push(RouteNames.PROFILE + `/` + userId)

    return <Loader />
  }
  if (isLoading) return <Loader />
  if (isLoadingMe) return <Loader />
  const submit = (data: SingInParams) => {
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
