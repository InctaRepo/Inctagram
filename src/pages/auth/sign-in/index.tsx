import { useLoginUserMutation } from '@/src/assets/api/auth'
import { LoginArgsType } from '@/src/assets/api/types'
import { useErrorToastHandler } from '@/src/assets/hooks/useErrorToastHandler'
import { LoginForm } from '@/src/components/auth/login-form/login-form'
import { NextPageWithLayout } from '@/src/pages/_app'

const SignInPage: NextPageWithLayout = () => {
  const [loginUser, { isSuccess, error }] = useLoginUserMutation()

  useErrorToastHandler(isSuccess, error)

  const submit = (data: LoginArgsType) => {
    loginUser(data)
  }

  return <LoginForm onSubmitHandler={submit} />
}

export default SignInPage
