import React, {FC} from 'react';
import s from '@/src/components/ui/auth-page/AuthPage.module.scss';
import {Button} from '@/src/components/ui/button';
import {Typography} from '@/src/components/ui/typography/typography';
import clsx from 'clsx';

type AuthPageType={
  title: string
  text: string
  nameButton: string
  children?: React.ReactNode
  nameButtonTwo?: string
  variant?: 'merger'
}
export const AuthPage: FC<AuthPageType> = ({title,variant,nameButtonTwo, children, text, nameButton}) => {

  const styles = {
    button: clsx(s.button, variant && s.buttonMerger)
  }
  return (
    <div className={s.container}>
      <div className={s.text_container}>
        <div className={s.title}>
          <Typography color='primary' variant='bold16'>{title}</Typography>
        </div>
        <div className={s.text}>
          <Typography color='primary' variant='regular14'>{text}</Typography>
        </div>
        <Button variant={variant ? 'outlined' : 'primary'} fullWidth={true} className={styles.button}>
          <Typography variant='bold14' >{nameButton}</Typography>
        </Button>
        {variant && <Button variant='outlined' className={styles.button}>
          <Typography variant='bold14'>{nameButtonTwo}</Typography>
        </Button>}
      </div>
      {children}
    </div>
    );
};

