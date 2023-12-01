import { useRouter } from 'next/router'
import React, { FC, memo, ReactNode } from 'react'
import { RouteNames } from '../../const/routeNames'
import { getAuthMeData } from '../../hoc/model/selectors/getAuthMeData/getAuthMeData'
import { useGetMeQuery } from '../../hoc/service/authProvider'
import { useAppSelector } from '../../hooks'
import { LoaderLogo } from '../../ui/loaderLogo/LoaderLogo'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = memo(({ children }) => {
  const { push, asPath } = useRouter()
  const authMeData = useAppSelector(getAuthMeData)?.email

  // const skipAuthMe = asPath.startsWith(RouteNames.AUTH) || asPath === PATH.ERROR_PAGE
  const skipAuthMe = asPath.startsWith(RouteNames.AUTH)
  const { isLoading, error } = useGetMeQuery(undefined, {
    skip: skipAuthMe,
  })

  const isAuthPage = authMeData || asPath.startsWith(RouteNames.AUTH)

  if (!isAuthPage && error) {
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
