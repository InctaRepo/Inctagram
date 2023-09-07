import { useErrorToast } from '@/src/assets/hooks/use-error-toast'
import { LoginForm } from '@/src/components/auth/login-form/login-form'
import { NextPageWithLayout } from '@/src/pages/_app'
import { LoginArgsType } from '@/src/services/auth/auth-api-types'
import { useLoginUserMutation, useRegConfirmMutation } from 'src/services/auth'

const SignInPage: NextPageWithLayout = () => {
  const [loginUser, { isSuccess, error }] = useLoginUserMutation()
  const [regConfirm, { isSuccess: isConfirm }] = useRegConfirmMutation()
  const code = 'a97469f2-639e-4aa8-b809-31a3f8b421b4'

  // TODO redirect here from email to page + code in url , take code and sent request to regConfirm
  // useEffect(() => {
  //   if (code) {
  //     regConfirm({ code })
  //   }
  //   // if ok , response {"extensions":[],"data":null,"resultCode":0}
  // {
  //   "extensions": [
  //   {
  //     "message": "email is already confirmed"
  //   }
  // ],
  //   "data": null,
  //   "resultCode": 2
  // }
  // }, [])

  useErrorToast(isSuccess, error)

  const submit = (data: LoginArgsType) => {
    loginUser(data)
      .unwrap()
      .then(data => {
        const token = data.data.accessToken

        // if (token) useAppDispatch(authActions.setAccessToken(token))
      })
    // {
    //   "extensions": [],
    //   "data": {
    //   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNjdmOTE3OS0xNmI4LTRkZmItYTk2ZC1lMjQ3OGRiNzk1YzYiLCJkZXZpY2VJZCI6IjlhYjc2OWMzLThhMmUtNDNhYy05ZWQ2LTk4NzI5MGFmMjVkYyIsImlhdCI6MTY5NDAwNzI0NiwiZXhwIjoxNjk0MDA4MTQ2fQ.kP6xtEYGf-AAKKE8ilGdPK3uOS_nQJj_IZV0eBDx5GU"
    // },
    //   "resultCode": 0
    // }
    // cookie : refreshToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNjdmOTE3OS0xNmI4LTRkZmItYTk2ZC1lMjQ3OGRiNzk1YzYiLCJkZXZpY2VJZCI6IjlhYjc2OWMzLThhMmUtNDNhYy05ZWQ2LTk4NzI5MGFmMjVkYyIsImlhdCI6MTY5NDAwNzI0NiwiZXhwIjoxNjk0MDkzNjQ2fQ.nFreD4IkY7mycjLBHrdO_LoLyAbnRPVWazDyja3spDw
  }

  return <LoginForm onSubmitHandler={submit} />
}

export default SignInPage
