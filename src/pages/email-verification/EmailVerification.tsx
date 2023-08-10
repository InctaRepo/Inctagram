import {AuthPage} from '@/src/components/ui/auth-page/AuthPage';
import TimeManagementImage from '@/src/assets/images/time-management-image';
import { AuthLayout } from '@/src/components/Layout/AuthLayout';

export const EmailVerification = () => {
    return <AuthLayout>
        <AuthPage title="Email verification link expired"
                  text="Looks like the verification link has
                      expired. Not to worry, we can send the
                      link again"
                  nameButton="Resend verification link"
        >{<TimeManagementImage/>}</AuthPage>
    </AuthLayout>

};
