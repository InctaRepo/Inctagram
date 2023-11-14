import React, { useState } from 'react'

import Image, { StaticImageData } from 'next/image'

import s from './public-post.module.scss'

import { Button } from '@/src/components/ui/button'
import { Typography } from '@/src/components/ui/typography'
type PublicPostType = {
  image: StaticImageData
  text: string
  username: string
}
export const PublicPost = ({ username, image, text }: PublicPostType) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const renderText = () => {
    if (isExpanded) {
      return <Typography variant="regular14">{text}</Typography>
    } else {
      const lines = text.split('')

      if (lines.length > 2) {
        const truncatedText = lines.slice(0, 2).join('')

        return (
          <div>
            <Typography variant="regular14">{truncatedText}</Typography>
            <Button variant="link" onClick={toggleExpand}>
              Читать далее
            </Button>
          </div>
        )
      } else {
        return text
      }
    }
  }

  return (
    <div className={s.container}>
      <Image className={s.image} src={image} alt="image" />
      <div className={s.user_info}>
        <Image className={s.avatar} src={image} alt="ava image" />
        <Typography variant="h3">{username}</Typography>
      </div>
      <Typography variant="small" className={s.time}>
        22 min ago
      </Typography>
      <React.Fragment>{renderText()}</React.Fragment>
    </div>
  )
}
