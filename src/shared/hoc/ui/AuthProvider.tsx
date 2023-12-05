import { useRouter } from 'next/router'
import React, { FC, memo, ReactNode, useEffect } from 'react'
import { RouteNames } from '../../const/routeNames'
import { useGetMeQuery } from '../../hoc/service/authProvider'
import { useAppSelector } from '../../hooks'
import { LoaderLogo } from '../../ui/loaderLogo/LoaderLogo'
import { getUserId } from '../model/selectors/getUserId/getUserId'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = memo(({ children }) => {
  const { push, asPath } = useRouter()
  const authMeData = useAppSelector(getUserId)

  // const skipAuthMe = asPath.startsWith(RouteNames.AUTH) || asPath === PATH.ERROR_PAGE
  const skipAuthMe = asPath.startsWith(RouteNames.AUTH)
  const { isLoading, error } = useGetMeQuery(undefined, {
    skip: skipAuthMe,
  })

  const isAuthPage = !!authMeData || asPath.startsWith(RouteNames.AUTH)
  const router = useRouter()

  // if (!isAuthPage) {
  //   push(RouteNames.SIGN_IN)
  //   console.log('1')
  //
  //   return <></>
  // }
  useEffect(() => {
    if (!isAuthPage) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuthPage, router])

  return (
    <>
      {isLoading && <LoaderLogo />}
      {children}
    </>
  )
})
