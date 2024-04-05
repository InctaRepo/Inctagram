import { useRouter } from 'next/router'

import { en } from '@/public/locales/en'
import { ru } from '@/public/locales/ru'

export const useTranslate = () => {
  const router = useRouter()

  const t = router.locale === 'ru' ? ru : en

  return { t }
}
