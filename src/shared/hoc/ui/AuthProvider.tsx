import React, { FC, memo, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

import { RouteNames } from '@/src/shared/const/routeNames'
import { getUserId, useGetMeQuery } from '@/src/shared/hoc'
import { useAppSelector } from '@/src/shared/hooks'
import { LoaderLogo } from '@/src/shared/ui/loaderLogo'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = memo(({ children }) => {
  const { push, asPath } = useRouter()

  // const skipAuthMe = asPath.startsWith(RouteNames.AUTH) || asPath === PATH.ERROR_PAGE
  const skipAuthMe = asPath.startsWith(RouteNames.AUTH)
  const { isLoading, error } = useGetMeQuery(undefined, {
    skip: skipAuthMe,
  })
  const authMeData = useAppSelector(getUserId)
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
