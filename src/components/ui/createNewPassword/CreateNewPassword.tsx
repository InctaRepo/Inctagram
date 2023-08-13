import React  from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { z } from 'zod';
import { Button } from "../../ui/button";
import { passwordsMatchSchema } from '@/src/common/schemas/passwordsMatch-schema';
import styles from './createNewPassword.module.scss';
import { ControlledTextField } from '@/src/components/ui/controlled';
import {Typography} from '@/src/components/ui/typography';

export type CteateNewPasswordType = z.infer<typeof passwordsMatchSchema>

type CreateNewPasswordPropsType = {
    onSubmitHandler: (data: CteateNewPasswordType) => void
}

export const CreateNewPassword = (props: CreateNewPasswordPropsType) => {
    const { onSubmitHandler } = props

    const { control, handleSubmit } = useForm<CteateNewPasswordType>({
        resolver: zodResolver(passwordsMatchSchema),
        mode: 'onChange'
    })

    const onSubmit = handleSubmit((data: any) => {
        onSubmitHandler(data)
    })

    return (

        <form className={styles.wrapper} onSubmit={onSubmit}>
            <Typography variant={'h1'} >Create New Password</Typography>
            <DevTool control={control} />

            <ControlledTextField
                control={control}
                name={'password'}
                type={'password'}
                label={'New password'}
                className={styles.password}
                placeholder={"******************"}/>

            <ControlledTextField
                control={control}
                name={'passwordConfirmation'}
                type={'password'}
                label={'Password confirmation'}
                className={styles.password}
                placeholder={"******************"}/>

            <Typography variant="medium14" className={styles.passwordRequirement}>
                Your password must be bettwen 6 and 20 <br/>
                characters
            </Typography>

            <Button type="submit" variant="primary" fullWidth={true} className={styles.btn}>
                <Typography variant="bold16">Create new password</Typography>
            </Button>
        </form>

    );
};
export default CreateNewPassword;