import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { Profile } from '@/src/components/profile'
import { useAppSelector } from '@/src/services'
import { authIsAuthSelector } from '@/src/services/auth/auth-selectors'

const Index = () => {
  const isAuth = useAppSelector(authIsAuthSelector)

  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push('/auth/sign-in')
    }
  }, [isAuth, router])

  return isAuth && <Profile />
}

export default Index
