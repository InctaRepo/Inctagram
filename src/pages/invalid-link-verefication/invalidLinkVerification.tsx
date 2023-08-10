import { AuthPage } from "@/src/components/ui/auth-page/AuthPage";
import TimeManagementImage from "@/src/assets/images/time-management-image";
import { AuthLayout } from "@/src/components/Layout/AuthLayout";

export const InvalidLinkVerification = () => {
  return (
    <AuthLayout>
      <AuthPage
        title="Email verification link invalid"
        text="Looks like the verification link has expired. Not to worry, we can send the link again"
        nameButton="Resend link"
      >
        {<TimeManagementImage />}
      </AuthPage>
    </AuthLayout>
  );
};
