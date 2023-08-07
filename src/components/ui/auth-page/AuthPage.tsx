import React, {FC} from 'react';
import s from '@/src/components/ui/auth-page/AuthPage.module.scss';
import {Button} from '@/src/components/ui/button';
import {Typography} from "@/src/components/ui/typography/typography";

type AuthPageType={
  title: string
  text: string
  nameButton: string
  children?: React.ReactNode
}
export const AuthPage: FC<AuthPageType> = ({title, children, text, nameButton}) => {
  return (
    <div className={s.container}>
      <div className={s.text_container}>
        <div className={s.title}>
          <Typography color='primary' variant='bold16'>{title}</Typography>
        </div>
        <div className={s.text}>
          <Typography color='primary' variant='regular14'>{text}</Typography>
        </div>
        <Button variant="primary" fullWidth={true} className={s.button}>
          <Typography variant='bold14' >{nameButton}</Typography>
        </Button>
      </div>
      {children}
    </div>
    );
};

