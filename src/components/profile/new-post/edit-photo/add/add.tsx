import React from 'react'

import Image from 'next/image'

import s from './add.module.scss'

import img from '@/src/assets/icons/image-ouline.svg'

export const Add = () => {
  return (
    <div className={s.addBtn}>
      <Image src={img} alt={'crop'} width={24} height={24} />
    </div>
  )
}
