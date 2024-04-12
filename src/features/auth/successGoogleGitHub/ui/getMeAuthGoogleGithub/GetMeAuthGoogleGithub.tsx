import { setId } from '@/features/auth/signIn'
import { RouteNames } from '@/shared/const'
import { useGetMeQuery } from '@/shared/hoc'
import { useAppDispatch } from '@/shared/hooks'
import { useRouter } from 'next/router'

export const GetMeAuthGoogleGithub = () => {
  const dispatch = useAppDispatch()
  const { data: user, isSuccess: isSuccessMe } = useGetMeQuery()
  const userId = user?.data?.userId
  const router = useRouter()

  if (isSuccessMe && userId) {
    router.push(RouteNames.PROFILE + '/' + userId)
    dispatch(setId({ id: userId }))
  }

  return <></>
}
