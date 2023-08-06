import React, {FC} from 'react';
import s from '@/src/components/ui/auth-page/AuthPage.module.scss';
import {Button} from '@/src/components/ui/button';

type AuthPageType={
  title: string
  text: string
  nameButton: string
  image?: string
  children?: React.ReactNode
}
export const AuthPage: FC<AuthPageType> = ({title, children, text, nameButton, image}) => {
  return (
    <div className={s.container}>
      <div className={s.text_container}>
        <span className={s.title}>{title}</span>
        <span className={s.text}>{text}</span>
        <Button variant="primary" className={s.button}>{nameButton}</Button>
      </div>
      {/*<Image src={image} alt='image'/>*/}
      {children}
    </div>
    );
};

