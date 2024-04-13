import React from 'react'

import { Button } from '@/ui/button'
import { Typography } from '@/ui/typography'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from '@/entities/auth/authPage/ui/authPage.module.scss'

type Props = {
  children?: React.ReactNode
  linkPath?: string
  nameButton: string
  nameButtonTwo?: string
  text: string
  title: string
  variant?: 'merger'
}
export const AuthPage = ({
  children,
  linkPath,
  nameButton,
  nameButtonTwo,
  text,
  title,
  variant,
}: Props) => {
  const styles = {
    button: clsx(s.button, variant && s.buttonMerger),
  }
  const router = useRouter()

  return (
    <div className={s.container}>
      <div className={s.text_container}>
        <div className={s.title}>
          <Typography color={'primary'} variant={'bold16'}>
            {title}
          </Typography>
        </div>
        <div className={s.text}>
          <Typography color={'primary'} variant={'regular14'}>
            {text}
          </Typography>
        </div>
        <Button
          className={styles.button}
          fullWidth
          onClick={() => linkPath && router.push(linkPath)}
          variant={variant ? 'outlined' : 'primary'}
        >
          <Typography variant={'bold14'}>{nameButton}</Typography>
        </Button>
        {variant && (
          <Button className={styles.button} variant={'outlined'}>
            <Typography variant={'bold14'}>{nameButtonTwo}</Typography>
          </Button>
        )}
      </div>
      {children}
    </div>
  )
}
