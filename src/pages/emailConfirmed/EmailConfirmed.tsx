import ConfirmedImage from "@/src/assets/images/email-confirmed-image";
import {AuthPage} from "@/src/components/ui/auth-page/AuthPage";
export const EmailConfirmed = () => {
    return  <AuthPage title='Congratulations!'
                      text='Your email has been confirmed'
                      nameButton='Sign In'>
            {<ConfirmedImage/>}
        </AuthPage>
};

