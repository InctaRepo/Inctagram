import { NextPageWithLayout } from "@/src/pages/_app";
import { getAuthLayout } from "@/src/components/Layout/AuthLayout/AuthLayout";
import SingInPage from "@/src/pages/auth/sing-in";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <SingInPage />
    </>
  );
};

Home.getLayout = getAuthLayout;
export default Home;
