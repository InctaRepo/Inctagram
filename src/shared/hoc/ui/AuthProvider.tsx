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
  const { asPath } = useRouter()
  const skipAuthMe = asPath.startsWith(RouteNames.AUTH) || asPath.endsWith('404')
  const { isLoading } = useGetMeQuery(undefined, {
    skip: skipAuthMe,
  })
  const authMeData = useAppSelector(getUserId)
  const publicPage = asPath.startsWith(RouteNames.PROFILE) || asPath.startsWith(RouteNames.HOME)
  const isAuthPage = !!authMeData || asPath.startsWith(RouteNames.AUTH) || publicPage
  const router = useRouter()

  useEffect(() => {
    if (!isAuthPage || (asPath.endsWith(RouteNames.PROFILE_SETTINGS) && !authMeData)) {
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
