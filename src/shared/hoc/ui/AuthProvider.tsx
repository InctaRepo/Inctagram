import React, { FC, ReactNode, memo, useEffect } from 'react'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { clearId, getToken } from '@/features/auth/signIn'
import { RouteNames } from '@/shared/const'
import { getUserId, setAuthMeData, useGetMeQuery } from '@/shared/hoc'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { LoaderLogo } from '@/ui/loaderLogo'
import { useRouter } from 'next/router'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = memo(({ children }) => {
  const { asPath, pathname, push } = useRouter()
  const dispatch = useAppDispatch()
  const token = useAppSelector(getToken) as string
  const userId = useAppSelector(getUserId)

  useEffect(() => {
    if (token === null) {
      dispatch(clearId())
      dispatch(setAuthMeData({ authMeData: { userId: null } }))
    }
  }, [dispatch, token])
  const publicPage = asPath.startsWith(RouteNames.PROFILE) || pathname === RouteNames.PUBLIC_PAGE
  const skipAuthMe = asPath.startsWith(RouteNames.AUTH) || asPath.endsWith('404')
  const { error, isLoading } = useGetMeQuery(undefined, {
    skip: skipAuthMe,
  })

  const isAuthPage = !!userId || asPath.startsWith(RouteNames.AUTH) || publicPage
  const router = useRouter()

  useEffect(() => {
    if (!isAuthPage || (asPath.endsWith(RouteNames.PROFILE_SETTINGS) && !userId)) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [asPath, isAuthPage, router, userId])
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
