import { useEffect } from 'react'

import { RouteNames } from '@/shared/const'
import { useErrorToast } from '@/shared/hooks'
import { Loader } from '@/ui/loader'
import { useRouter } from 'next/router'

import { useRegistrationConfirmationMutation } from '../service'

export const RegistrationConfirmation = () => {
  const { push, query } = useRouter()

  const [confirmRegistration, { data, isLoading, isSuccess }] =
    useRegistrationConfirmationMutation()
  const error = data?.extensions && data.extensions.length > 0 && data.extensions[0].message

  const setToastHandler = () => {
    // TODO: исправить типы
    // @ts-ignore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useErrorToast(false, error?.data?.messages[0]?.message ?? 'Some error')
  }

  useEffect(() => {
    if (isSuccess) {
      push(RouteNames.SIGN_IN)
    }
    if (error) {
      setToastHandler()
    }
  }, [isSuccess, push, error, setToastHandler])

  useEffect(() => {
    if (query.code && !isLoading) {
      confirmRegistration({ code: query.code } as { code: string })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.code])

  return <Loader />
}
