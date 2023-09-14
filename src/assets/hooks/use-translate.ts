import { useRouter } from 'next/router'

import { en } from '@/src/locales/en'
import { ru } from '@/src/locales/ru'

export const useTranslate = () => {
  const router = useRouter()

  const t = router.locale === 'en' ? en : ru

  return { t }
}
