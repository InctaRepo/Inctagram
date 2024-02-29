import React from 'react'

import s from '@/features/home/ui/home.module.scss'
import { getIsAuth } from '@/shared/hoc'
import { useAppSelector } from '@/shared/hooks'
import { Sidebar } from '@/shared/sidebar'
import { Button } from '@/ui/button'

export const Home = () => {
  const options = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  } as const
  const isAuth = useAppSelector(getIsAuth)
  const onHandlerSpace = async () => {
    try {
      const rawResponse = await fetch('https://inctagram.space/api/revalidate?secret=ttt', {
        method: 'POST',
        headers: options,
      })

      await rawResponse.json()
    } catch (e) {
      console.error(e)
    }
  }
  const onHandlerRuby = async () => {
    try {
      const rawResponse = await fetch(
        'https://inctagram-ruby.vercel.app/api/revalidate?secret=ttt',
        {
          method: 'POST',
          headers: options,
        }
      )

      await rawResponse.json()
    } catch (e) {
      console.error(e)
    }
  }
  const onHandlerLocal = async () => {
    try {
      const rawResponse = await fetch('http://localhost:3000/api/revalidate?secret=ttt', {
        method: 'POST',
        headers: options,
      })

      await rawResponse.json()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={s.container}>
      {isAuth && <Sidebar />}
      <div className={isAuth ? s.containerInfo : s.containerInfoPublic}>Home</div>
      <Button variant={'primary'} onClick={onHandlerSpace}>
        inctagram.space Revalidate
      </Button>
      <Button variant={'primary'} onClick={onHandlerRuby}>
        inctagram-ruby Revalidate
      </Button>
      <Button variant={'primary'} onClick={onHandlerLocal}>
        Local Revalidate
      </Button>
    </div>
  )
}
