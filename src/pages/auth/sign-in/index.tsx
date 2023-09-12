import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { LoginForm } from '@/src/components/auth/login-form/login-form'
import { getAuthLayout } from '@/src/components/layout/auth-layout'
import { NextPageWithLayout } from '@/src/pages/_app'
import { useAppSelector } from '@/src/services'
import { useLoginUserMutation } from '@/src/services/auth/auth-api'
import { LoginArgsType } from '@/src/services/auth/auth-api-types'
import { authIsAuthSelector } from '@/src/services/auth/auth-selectors'

const SignInPage: NextPageWithLayout = () => {
  const [loginUser] = useLoginUserMutation()
  const isAuth = useAppSelector(authIsAuthSelector)
  const router = useRouter()

  useEffect(() => {
    if (isAuth) {
      router.push('/profile')
    }
  }, [isAuth, router])

  const submit = (data: LoginArgsType) => {
    loginUser(data)
  }

  return <LoginForm onSubmitHandler={submit} />
}

SignInPage.getLayout = getAuthLayout
export default SignInPage
