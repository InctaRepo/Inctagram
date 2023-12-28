// eslint-disable-next-line @conarti/feature-sliced/public-api
import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { RouteNames } from '@/src/shared/const'
import { getPublicLayout } from '@/src/widgets/layout/authLayout'

const Main = () => {
  const router = useRouter()

  useEffect(() => {
    router.push(RouteNames.HOME)
  }, [])

  return <></>
}

Main.getLayout = getPublicLayout

export default Main
