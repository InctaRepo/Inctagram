import s from './forgotPassword.module.scss';
import {Typography} from "src/components/ui/typography/typography";
import {Recaptcha} from "@/src/components/ui/recaptcha/Recaptcha";
import {Card} from "@/src/components/ui/card-temporary";
import {TextField} from "@/src/components/ui/TextField/TextField";
import {Button} from "src/components/ui/button/button";

interface Props {
    primary?: boolean
}

export const ForgotPassword: React.FC<Props> = ({
                                                    primary
                                                }) => {

    const mode = `storybook-forgotPassword--${primary ? 'primary' : 'secondary'}`;

    console.log(mode)

    return (
        <div
            className={s[mode]}
        >
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
                    variant='text'
                    className={s.cancel}
                >
                    Back to Sign In
                </Button>
                <Recaptcha
                    primary
                    className={s.recaptcha}
                />
                <Typography
                    variant='regular14'
                    className={s.answer}
                >
                    The link has been sent by email.<br/>
                    If you don’t receive an email send link again
                </Typography>
                <Button
                    variant='primary'
                    className={s.repeat}
                >
                    Send Link Again
                </Button>
                <Button
                    variant='text'
                    className={s.back}
                >
                    Back to Sign In
                </Button>
            </Card>
        </div>
    )
};