import React from 'react'

import s from './public-posts.module.scss'

import Img from '@/src/assets/images/air-balloon.jpg'
import { PublicPost } from '@/src/components/public-posts/public-post/public-post'
import { Typography } from '@/src/components/ui/typography'
export const PublicPosts = () => {
  const word = '009213'
  const letters = word.split('')
  const fakeData = [
    {
      id: 1,
      image: Img,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor incd.mpor incd.mpo.. Hide',
      username: 'URLProfile',
    },
    {
      id: 2,
      image: Img,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor incd.mpor incd.mpo.. Hide',
      username: 'URLProfile',
    },
    {
      id: 3,
      image: Img,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor incd.mpor incd.mpo.. Hide',
      username: 'URLProfile',
    },
    {
      id: 4,
      image: Img,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor incd.mpor incd.mpo.. Hide',
      username: 'URLProfile',
    },
    {
      id: 5,
      image: Img,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor incd.mpor incd.mpo.. Hide',
      username: 'URLProfile',
    },
    {
      id: 6,
      image: Img,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor incd.mpor incd.mpo.. Hide',
      username: 'URLProfile',
    },
  ]

  return (
    <div className={s.container}>
      <div className={s.register_users}>
        <Typography variant="h2">Registered users:</Typography>
        <div className={s.box_value}>
          {letters.map((letter, index) => (
            <React.Fragment key={index}>
              <Typography className={s.value_posts} variant="h2">
                {letter}
              </Typography>
              {index !== letters.length - 1 && <span className={s.line} />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className={s.posts_container}>
        {fakeData.map(el => (
          <PublicPost key={el.id} image={el.image} text={el.text} username={el.username} />
        ))}
      </div>
    </div>
  )
}
