import { useSignIn } from '@/features/auth/signIn/hooks'
import { LoginForm } from '@/features/auth/signIn/ui/loginForm'

export const SignIn = () => {
  const { errorServer, submit } = useSignIn()

  return <LoginForm errorServer={errorServer} onSubmitHandler={submit} />
}
