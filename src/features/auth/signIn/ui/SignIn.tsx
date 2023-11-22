import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetProfileQuery } from '@/src/features/profile/service/profileApi'
import { RouteNames } from '@/src/shared/const/routeNames'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/types'
import { authIsAuthSelector, useGetMeQuery } from '../../../auth/authService'
import { SingInParams } from '../model/types/types'
import { useSignInMutation } from '../service/signIn'
import { LoginForm } from './loginForm'

export const SignIn: NextPageWithLayout = () => {
  const [loginUser] = useSignInMutation()
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
      router.push(RouteNames.PROFILE)
    }
  }, [isAuth, router, currentData])

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
