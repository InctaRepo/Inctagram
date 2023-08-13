import { AuthLayout } from '@/src/components/Layout/AuthLayout'
import CreateNewPassword, {
  CreateNewPasswordType,
} from '@/src/components/ui/createNewPassword/CreateNewPassword'
import { NextPageWithLayout } from '@/src/pages/_app'

const CreateNewPasswordPage: NextPageWithLayout = () => {
  const submit = (data: CreateNewPasswordType) => {
    alert(data)
  }

  return (
    <AuthLayout>
      {/*@ts-ignore*/}
      <CreateNewPassword onSubmitHandler={submit} />
    </AuthLayout>
  )
}

export default CreateNewPasswordPage
