import ConfirmedImage from "@/src/assets/images/email-confirmed-image";
import {AuthPage} from "@/src/components/ui/auth-page/AuthPage";
import {AuthLayout} from "@/src/components/Layout/AuthLayout";
export const EmailConfirmed = () => {
    return <AuthLayout>
        <AuthPage title='Congratulations!'
                  text='Your email has been confirmed'
                  nameButton='Sign In'>
            {<ConfirmedImage/>}
        </AuthPage>
    </AuthLayout>

};

