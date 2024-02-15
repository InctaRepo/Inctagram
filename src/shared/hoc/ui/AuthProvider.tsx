import React, { FC, memo, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { getUserId } from '@/features/auth/signIn'
import { RouteNames } from '@/shared/const'
import { useGetMeQuery } from '@/shared/hoc'
import { useAppSelector } from '@/shared/hooks'
import { LoaderLogo } from '@/ui/loaderLogo'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = memo(({ children }) => {
  const { push, asPath } = useRouter()
  const skipAuthMe = asPath.startsWith(RouteNames.AUTH) || asPath.endsWith('404')
  const { isLoading, error } = useGetMeQuery(undefined, {
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
  if (error && !isAuthPage) {
    push(RouteNames.SIGN_IN)

    return <></>
  }

  return (
    <>
      {isLoading && <LoaderLogo />}
      {children}
    </>
  )
})
