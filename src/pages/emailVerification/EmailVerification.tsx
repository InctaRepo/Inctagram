import emailVerification from "@/src/assets/images/EmailVerification.svg";
import {AuthPage} from "@/src/components/ui/auth-page/AuthPage";
export const EmailVerification = () => {
    return  <AuthPage title='Email verification link expired'
                      text='Looks like the verification link has
                      expired. Not to worry, we can send the
                      link again'
                      nameButton='Resend verification link'
                      image={emailVerification}/>
};
