import {
  RegisterForm,
  RegisterFormType,
} from "@/src/components/auth/register-form";
import { NextPageWithLayout } from "@/src/pages/_app";
import { getAuthLayout } from "@/src/components/Layout/AuthLayout/AuthLayout";
import { useRegistrationMutation } from "@/src/api/authApi/authApi";
import { Typography } from "@/src/components/ui/typography";

const SignUpPage: NextPageWithLayout = () => {
  const [register, { isError, isLoading, error }] = useRegistrationMutation();

  const submit = (data: RegisterFormType) => {
    register(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else
    return (
      <>
        {/*@ts-ignore*/}
        {isError && (
          <Typography color={"error"}>
            {error?.data.message[0].message}
          </Typography>
        )}
        <RegisterForm onSubmitHandler={submit} />
      </>
      //TODO linkpath to sign in
    );
};

SignUpPage.getLayout = getAuthLayout;
export default SignUpPage;
