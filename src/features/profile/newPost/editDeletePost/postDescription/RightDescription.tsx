import { Separator } from '@radix-ui/react-separator'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import bookmark from '@/src/assets/icons/bookmark-outline.svg'
import heart from '@/src/assets/icons/heart-outline.svg'
import plane from '@/src/assets/icons/paper-plane-outline.svg'
import redHeart from '@/src/assets/icons/red-heart-outline.svg'
import AvatarImage from '@/src/assets/images/avatar-image'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative,@conarti/feature-sliced/layers-slices
import { Images } from '@/src/features/posts/postApiTypes'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { UserInfo } from '@/src/features/profile/service/profileApiTypes'
import { useTranslate } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui/button'
import { ControlledTextArea } from '@/src/shared/ui/controlled/ControlledTextArea'
import { Typography } from '@/src/shared/ui/typography'
import { Buttons } from '../../editDeletePost/postDescription/editDeleteButtons/Buttons'
import s from '../../editDeletePost/postDescription/RightDescription.module.scss'
import { fakeComments } from './fakeComments'

type Props = {
  description?: string
  createdAt: Date
  userData: UserInfo
  userName: string
  isEditModalOpen?: boolean
  setIsEditModalOpen: (isEditModalOpen: boolean) => void
  images?: Images[]
  id?: string
}

export const RightDescription = ({
  description,
  createdAt,
  userData,
  userName,
  isEditModalOpen,
  setIsEditModalOpen,
  images,
  id,
}: Props) => {
  const { t } = useTranslate()
  const { control } = useForm()
  const [isLikeActive, setIsLikeActive] = useState(false)

  const dateOfPost = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    day: '2-digit',
    month: 'long',
  })

  const handleLike = () => {
    //setIsLikeActive(current => !current)
  }

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.title}>
          <div className={s.userHead}>
            <div className={s.userAvaHead}>
              <Image src={userData.avatar} width={36} height={36} alt={'ava'} className={s.ava} />
            </div>
            <div className={s.userNameHead}>
              <Typography variant={'h3'} color="primary">
                {userName}
              </Typography>
            </div>
          </div>
          <Buttons
            images={images}
            id={id}
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            description={description}
            createdAt={createdAt}
            userName={userName}
            userData={userData}
          />
        </div>
        <Separator className={s.separator} />
        <div className={s.comments}>
          <div className={s.user}>
            <div>
              <Image src={userData.avatar} width={36} height={36} alt={'ava'} className={s.ava} />
            </div>
            <div className={s.userName}>
              <Typography variant={'h3'} color="primary">
                {userName}
              </Typography>
            </div>
            <Typography variant={'regular14'}>{description}</Typography>
          </div>
          <Typography variant={'small'} color={'secondary'} className={s.time}>
            {' '}
            2 hours ago
          </Typography>

          {fakeComments.map((el, index) => (
            <div className={s.usersComment} key={el.id}>
              <div className={s.commentsArea}>
                <div className={s.userCommet}>
                  <AvatarImage className={s.ava} />
                </div>
                <Typography variant={'regular14'} className={s.oneComment}>
                  <div className={s.userName}>
                    <Typography variant={'h3'} color="primary">
                      {el.userName + index}
                    </Typography>
                  </div>
                  {el.comment}
                </Typography>
                <Image
                  src={isLikeActive ? redHeart : heart}
                  alt={'heart'}
                  width={16}
                  height={16}
                  className={isLikeActive ? s.red : s.iconForComment}
                  onClick={handleLike}
                />
              </div>
              <Typography variant={'small'} color={'secondary'} className={s.time}>
                {el.grayText}
              </Typography>
            </div>
          ))}
        </div>
        <Separator className={s.separator} />
        <div className={s.likesArea}>
          <div className={s.iconsArea}>
            <div className={s.heartPlane}>
              <Image src={heart} alt={'heart'} width={24} height={24} className={s.icon} />
              <Image src={plane} alt={'plane'} width={24} height={24} className={s.icon} />
            </div>
            <div className={s.bookmark}>
              <Image
                src={bookmark}
                alt={'bookmark'}
                width={24}
                height={24}
                className={s.bookmark}
              />
            </div>
          </div>
          <div className={s.likesCounter}>
            <div className={s.likes}>
              <span>
                <AvatarImage className={s.firstAvaLikes} />
              </span>

              <span>
                <AvatarImage className={s.avaLikes} />
              </span>

              <span>
                <AvatarImage className={s.lastAvaLikes} />
              </span>

              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <div className={s.text}>
                <Typography variant="regular14">2 234 </Typography>
                <Typography className={s.boldText} variant="bold14">
                  Like
                </Typography>
              </div>
            </div>
            <Typography variant="small" color="secondary">
              {dateOfPost}
            </Typography>
          </div>
        </div>
        <Separator className={s.separator} />

        <div className={s.addComment}>
          <div className={s.textarea}>
            <ControlledTextArea
              variant="comment"
              control={control}
              className={s.comment}
              name={'addComment'}
              placeholder={t.profile.editPost.comment}
              fullWidth={true}
            />
          </div>
          <Button variant="text" className={s.publishButton}>
            {t.profile.publish}
          </Button>
        </div>
      </div>
    </>
  )
}
