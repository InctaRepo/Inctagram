import s from './forgotPassword.module.scss';
import {Typography} from "src/components/ui/typography/typography";
import {Recaptcha} from "@/src/components/ui/recaptcha/Recaptcha";
import {Card} from "@/src/components/ui/card-temporary";
import {TextField} from "@/src/components/ui/TextField/TextField";
import {Button} from "src/components/ui/button/button";

export const ForgotPassword = () => {
    return (
        <Card
            className={s.main}
        >
            <Typography
                variant='h1'
                className={s.title}
            >
                Forgot Password
            </Typography>
            <TextField
                width='330px'
                label='Email'
                placeholder='Epam@epam.com'
                className={s.input}
            />
            <Typography
                variant='regular14'
                className={s.hint}
            >
                Enter your email address and we will send you further instructions
            </Typography>
            <Button
                variant='primary'
                className={s.submit}
            >
                Send Link
            </Button>
            <Button
                variant='link'
                className={s.cancel}
            >
                Back to Sign In
            </Button>
            <Recaptcha
                primary
                className={s.recaptcha}
            />
        </Card>
    )
};