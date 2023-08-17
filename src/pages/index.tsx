import { useRouter } from 'next/router'

import { getAuthLayout } from '@/src/components/Layout/AuthLayout/AuthLayout'
import { NextPageWithLayout } from '@/src/pages/_app'
import { en } from 'locales/en'
import { ru } from 'locales/ru'
import SignInPage from 'src/pages/auth/sign-in'

const Home: NextPageWithLayout = () => {
  const router = useRouter()

  console.log('router.locales: ', router.locales) //существующие
  console.log('router.locale: ', router.locale) //текущая
  console.log('router.defaultLocale: ', router.defaultLocale) //дефолтная
  const t = router.locale === 'en' ? en : ru

  return (
    <>
      {/*<h1>{t.test}</h1>*/}
      <SignInPage />
    </>
  )
}

Home.getLayout = getAuthLayout
export default Home
