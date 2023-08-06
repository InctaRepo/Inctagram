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
        <span className={s.title}>{title}</span>
        <span className={s.text}>{text}</span>
        <Button variant="primary" fullWidth={true} className={s.button}>
          <Typography variant='bold14'>{nameButton}</Typography>
        </Button>
      </div>
      {children}
    </div>
    );
};

