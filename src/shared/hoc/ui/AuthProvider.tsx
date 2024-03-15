import React, { FC, memo, ReactNode, useEffect } from 'react'

import { useRouter } from 'next/router'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { clearId, getToken } from '@/features/auth/signIn'
import { RouteNames } from '@/shared/const'
import { getUserId, setAuthMeData, useGetMeQuery } from '@/shared/hoc'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { LoaderLogo } from '@/ui/loaderLogo'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = memo(({ children }) => {
  const { push, asPath, pathname } = useRouter()
  const dispatch = useAppDispatch()
  const token = useAppSelector(getToken) as string
  const userId = useAppSelector(getUserId)

  useEffect(() => {
    if (token === null) {
      dispatch(clearId())
      dispatch(setAuthMeData({ authMeData: { userId: null } }))
    }
  }, [token])
  const publicPage = asPath.startsWith(RouteNames.PROFILE) || pathname === RouteNames.PUBLIC_PAGE
  const skipAuthMe = asPath.startsWith(RouteNames.AUTH) || asPath.endsWith('404')
  const { isLoading, error } = useGetMeQuery(undefined, {
    skip: skipAuthMe,
  })

  const isAuthPage = !!userId || asPath.startsWith(RouteNames.AUTH) || publicPage
  const router = useRouter()

  useEffect(() => {
    if (!isAuthPage || (asPath.endsWith(RouteNames.PROFILE_SETTINGS) && !userId)) {
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
