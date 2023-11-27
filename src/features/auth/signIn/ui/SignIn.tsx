import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { RouteNames } from '@/src/shared/const/routeNames'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/types'
import { getIsAuth } from '../../../auth/authService'
import { SingInParams, useSignInMutation } from '../authByEmail'
import { LoginForm } from './loginForm'

export const SignIn: NextPageWithLayout = () => {
  const [loginUser] = useSignInMutation()
  const isAuth = useAppSelector(getIsAuth)
  const router = useRouter()
  const [errorServer, setErrorServer] = useState<string>('')

  useEffect(() => {
    if (isAuth) {
      router.push(RouteNames.PROFILE)
    }
  }, [isAuth, router])

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
