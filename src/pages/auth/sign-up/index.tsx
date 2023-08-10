import { useRegistrationMutation } from '@/src/api/authApi/authApi'
import { RegisterForm, RegisterFormType } from '@/src/components/auth/register-form'
import { getAuthLayout } from '@/src/components/Layout/AuthLayout/AuthLayout'
import { Typography } from '@/src/components/ui/typography'
import { NextPageWithLayout } from '@/src/pages/_app'

const SignUpPage: NextPageWithLayout = () => {
  const [register, { isError, isLoading, error, data, isSuccess }] = useRegistrationMutation()

  const submit = (data: RegisterFormType) => {
    register(data)
  }

  if (isLoading) {
    return <div>Loading...</div>
  } else
    return (
      <>
        {/*@ts-ignore*/}
        {isError && <Typography color={'error'}>{error?.data.message[0].message}</Typography>}
        <RegisterForm linkPath={'#'} onSubmitHandler={submit} />
      </>
      //TODO linkpath to sign in
    )
}

SignUpPage.getLayout = getAuthLayout
export default SignUpPage
