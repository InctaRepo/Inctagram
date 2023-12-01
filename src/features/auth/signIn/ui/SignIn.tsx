import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetProfileQuery } from '@/src/features/profile/service/profileApi'
import { RouteNames } from '@/src/shared/const/routeNames'
import { useGetMeQuery } from '@/src/shared/hoc/service/authProvider'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/types'
import { getIsAuth } from '../../../auth/authService'
import { SingInParams, useSignInMutation } from '../authByEmail'
import { LoginForm } from './loginForm'

export const SignIn: NextPageWithLayout = () => {
  const [loginUser, { isLoading, isSuccess }] = useSignInMutation()
  const isAuth = useAppSelector(getIsAuth)
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

  // if (isSuccess) {
  //   router.push(RouteNames.PROFILE)
  //
  //   return <></>
  // }
  // if (isLoading) return <Loader />
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
