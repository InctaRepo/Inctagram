import { useQueryClient } from 'react-query'

import { RegisterForm, RegisterFormType } from '@/src/components/auth/register-form'
import { getAuthLayout } from '@/src/components/Layout/AuthLayout/AuthLayout'
import { NextPageWithLayout } from '@/src/pages/_app'

const SignUpPage: NextPageWithLayout = () => {
  const queryClient = useQueryClient()
  const baseURL = 'https://inctagram-social.vercel.app/auth/signup'
  // Мутация
  // const mutation = useMutation(formData => axios.post(baseURL, formData))
  const submit = (formData: RegisterFormType) => {
    // mutation.mutate(formData)
  }

  // if (isLoading) return 'Loading...'

  return (
    <>
      {/*{isError && <Typography color={'error'}>{error?.data.message[0].message}</Typography>}*/}
      <RegisterForm linkPath={'#'} onSubmitHandler={submit} />
    </>
    //TODO linkpath to sign in
  )
}

SignUpPage.getLayout = getAuthLayout
export default SignUpPage
