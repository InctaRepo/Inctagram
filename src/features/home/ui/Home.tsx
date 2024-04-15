import React from 'react'

import {
  LOCAL_REVALIDATE,
  PRODUCTION_REVALIDATE,
  REVALIDATE_SECRET,
  TEST_REVALIDATE,
} from '@/shared/const'
import { getIsAuth } from '@/shared/hoc'
import { useAppSelector } from '@/shared/hooks'
import { Sidebar } from '@/shared/sidebar'
import { Button } from '@/ui/button'

import s from '@/features/home/ui/home.module.scss'

export const Home = () => {
  const options = {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  } as const
  const isAuth = useAppSelector(getIsAuth)
  const onHandlerSpace = async () => {
    try {
      const rawResponse = await fetch(PRODUCTION_REVALIDATE + `?secret=${REVALIDATE_SECRET}`, {
        headers: options,
        method: 'POST',
      })

      await rawResponse.json()
    } catch (e) {
      console.error(e)
    }
  }
  const onHandlerRuby = async () => {
    try {
      const rawResponse = await fetch(TEST_REVALIDATE + `?secret=${REVALIDATE_SECRET}`, {
        headers: options,
        method: 'POST',
      })

      await rawResponse.json()
    } catch (e) {
      console.error(e)
    }
  }
  const onHandlerLocal = async () => {
    try {
      const rawResponse = await fetch(LOCAL_REVALIDATE + `?secret=${REVALIDATE_SECRET}`, {
        headers: options,
        method: 'POST',
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
      <Button onClick={onHandlerSpace} variant={'primary'}>
        inctagram.space Revalidate
      </Button>
      <Button onClick={onHandlerRuby} variant={'primary'}>
        inctagram-ruby Revalidate
      </Button>
      <Button onClick={onHandlerLocal} variant={'primary'}>
        Local Revalidate
      </Button>
    </div>
  )
}
