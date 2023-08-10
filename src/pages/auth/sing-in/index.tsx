import { NextPageWithLayout } from "@/src/pages/_app";
import { LogInform } from "@/src/components/auth/login-form/LogIn-form";

const SingInPage: NextPageWithLayout = () => {
  return (
    <>
      {/*@ts-ignore*/}
      <LogInform />
    </>
    //TODO linkpath to sign in
  );
};

export default SingInPage;
