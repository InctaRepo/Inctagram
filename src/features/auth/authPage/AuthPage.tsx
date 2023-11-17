import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Button } from '@/src/shared/ui/button'
import { Typography } from '@/src/shared/ui/typography/Typography'
import s from './authPage.module.scss'

type AuthPageType = {
  title: string
  text: string
  nameButton: string
  children?: React.ReactNode
  nameButtonTwo?: string
  variant?: 'merger'
  linkPath?: string
}
export const AuthPage: FC<AuthPageType> = ({
  title,
  variant,
  nameButtonTwo,
  children,
  text,
  nameButton,
  linkPath,
}) => {
  const styles = {
    button: clsx(s.button, variant && s.buttonMerger),
  }
  const router = useRouter()

  return (
    <div className={s.container}>
      <div className={s.text_container}>
        <div className={s.title}>
          <Typography color="primary" variant="bold16">
            {title}
          </Typography>
        </div>
        <div className={s.text}>
          <Typography color="primary" variant="regular14">
            {text}
          </Typography>
        </div>
        <Button
          variant={variant ? 'outlined' : 'primary'}
          fullWidth={true}
          className={styles.button}
          onClick={() => linkPath && router.push(linkPath)}
        >
          <Typography variant="bold14">{nameButton}</Typography>
        </Button>
        {variant && (
          <Button variant="outlined" className={styles.button}>
            <Typography variant="bold14">{nameButtonTwo}</Typography>
          </Button>
        )}
      </div>
      {children}
    </div>
  )
}
