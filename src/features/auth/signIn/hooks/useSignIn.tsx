import { useEffect, useState } from 'react'

import { setId } from '@/features/auth/signIn'
import { SingInParams, useSignInMutation } from '@/features/auth/signIn/authByEmail'
import { RouteNames, resultCode } from '@/shared/const'
import { useGetMeQuery } from '@/shared/hoc'
import { useAppDispatch } from '@/shared/hooks'
import { useRouter } from 'next/router'

export const useSignIn = () => {
  const dispatch = useAppDispatch()
  const [loginUser, { data: loginData, isSuccess }] = useSignInMutation()
  const router = useRouter()
  const [errorServer, setErrorServer] = useState<string>('')
  const { data: user, isSuccess: isSuccessMe } = useGetMeQuery()
  const userId = user?.data?.userId!

  useEffect(() => {
    if (isSuccess && isSuccessMe && userId && loginData?.resultCode === resultCode.OK) {
      router.push(RouteNames.PROFILE + '/' + userId)
      dispatch(setId({ id: userId }))
    }
  }, [isSuccess, isSuccessMe, userId, errorServer, loginData?.resultCode, router, dispatch])
  const submit = (data: SingInParams) => {
    setErrorServer('')
    loginUser(data)
      .unwrap()
      .then(payload => {
        if (typeof payload.extensions[0]?.message === 'string') {
          setErrorServer(payload.extensions[0]?.message)
        }
        if (typeof payload.extensions[0]?.message !== 'string') {
          setErrorServer(payload.extensions[0]?.message[0].message)
        }
      })
  }

  return { errorServer, submit }
}
