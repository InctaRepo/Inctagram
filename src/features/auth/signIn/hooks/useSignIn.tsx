import { useEffect, useState } from 'react'

import { setId } from '@/features/auth/signIn'
import { SingInParams, useSignInMutation } from '@/features/auth/signIn/authByEmail'
import { RouteNames } from '@/shared/const'
import { useGetMeQuery } from '@/shared/hoc'
import { useAppDispatch } from '@/shared/hooks'
import { useRouter } from 'next/router'

export const useSignIn = () => {
  const dispatch = useAppDispatch()
  const [loginUser, { isSuccess }] = useSignInMutation()
  const router = useRouter()
  const [errorServer, setErrorServer] = useState<string>('')
  const { data: user, isSuccess: isSuccessMe } = useGetMeQuery()
  const userId = user?.userId!

  useEffect(() => {
    if (isSuccess || (isSuccessMe && userId)) {
      router.push(RouteNames.PROFILE + '/' + userId)
      dispatch(setId({ id: userId }))

      return
    }
  }, [isSuccess, isSuccessMe, userId, router, dispatch])
  const submit = (data: SingInParams) => {
    setErrorServer('')
    loginUser(data)
      .unwrap()
      .catch((error: any) => {
        console.error(error)
        if (error && Array.isArray(error.data?.messages)) {
          setErrorServer(error.data.messages[0].message)
        } else if (error && error.data?.messages) {
          setErrorServer(error.data.messages)
        } else {
          setErrorServer('Some error occurred')
        }
      })
  }

  return { errorServer, submit }
}
