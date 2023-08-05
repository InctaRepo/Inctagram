import React from 'react';
import {Button} from "@/src/components/ui/button";
import s from '@/src/pages/emailConfirmed/EmailConfirmed.module.scss'
import {ConfirmedImage} from "@/src/assets/images/ConfirmedImage";
export const EmailConfirmed = () => {
    return (
        <div className={s.container}>
            <div className={s.text_container}>
                <span className={s.title}>Congratulations!</span>
                <span className={s.text}>Your email has been confirmed</span>
                <Button variant='primary' className={s.button}>{'Sign In'}</Button>
            </div>
            <ConfirmedImage/>
        </div>
    );
};

