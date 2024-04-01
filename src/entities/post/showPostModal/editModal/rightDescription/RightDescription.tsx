import React, { useState } from 'react'

import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Separator } from '@radix-ui/react-separator'
import ImageAva from 'next/image'
import { useForm } from 'react-hook-form'

import { PostMenu } from '@/entities/post/postMenu'
import { fakeComments } from '@/entities/post/showPostModal/editModal/rightDescription/fakeComments'
import s from '@/entities/post/showPostModal/editModal/rightDescription/rightDescription.module.scss'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/entities/profile/service'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Images } from '@/features/posts'
import AvatarImage from '@/public/icon/avatarIcon.svg'
import Bookmark from '@/public/icon/bookmark.svg'
import Heart from '@/public/icon/heart.svg'
import Plane from '@/public/icon/plane.svg'
import DefaultAva from '@/public/images/avatarIcon.jpg'
import { getIsAuth } from '@/shared/hoc'
import { useAppSelector, useTranslate } from '@/shared/hooks'
import { Button } from '@/shared/ui/button'
import { ControlledTextArea } from '@/ui/controlled'
import { Typography } from '@/ui/typography'

type Props = {
  openSureDescriptionModal: boolean
  setIsEditDescriptionModalOpen: (isEditDescriptionModalOpen: boolean) => void
  isEditDescriptionModalOpen: boolean
  description?: string
  createdAt?: Date
  userData?: UserInfo
  isEditModalOpen?: boolean
  setIsEditModalOpen: (isEditModalOpen: boolean) => void
  images?: Images[]
  id: string
}

export const RightDescription = ({
  openSureDescriptionModal,
  setIsEditDescriptionModalOpen,
  isEditDescriptionModalOpen,
  description,
  createdAt,
  userData,
  isEditModalOpen,
  setIsEditModalOpen,
  images,
  id,
}: Props) => {
  const { t } = useTranslate()
  const { control } = useForm()
  const [isAvaBroken, setIsAvaBroken] = useState(false)
  const [isLikeActive, setIsLikeActive] = useState(false)
  const isAuth = useAppSelector(getIsAuth)
  const dateOfPost = new Date(createdAt ? createdAt : '').toLocaleDateString('en-US', {
    year: 'numeric',
    day: '2-digit',
    month: 'long',
  })

  const handleLike = () => {
    //setIsLikeActive(current => !current)
  }
  const errorHandler = () => {
    setIsAvaBroken(true)
  }
  const avaWithError = isAvaBroken ? DefaultAva : userData?.avatar!

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.title}>
          <div className={s.userHead}>
            <div className={s.userAvaHead}>
              {userData?.avatar !== null ? (
                <ImageAva
                  src={userData?.avatar! ? userData?.avatar! : avaWithError}
                  width={36}
                  height={36}
                  alt={'ava'}
                  className={s.ava}
                  priority={true}
                  onError={errorHandler}
                  placeholder="blur"
                />
              ) : (
                <AvatarImage className={s.ava} />
              )}
            </div>
            <div className={s.userNameHead}>
              <Typography variant={'h3'} color="primary">
                {userData?.username}
              </Typography>
            </div>
          </div>
          {isAuth && (
            <PostMenu
              openSureDescriptionModal={openSureDescriptionModal}
              setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
              isEditDescriptionModalOpen={isEditDescriptionModalOpen}
              images={images}
              id={id}
              isEditModalOpen={isEditModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              description={description}
              createdAt={createdAt}
              userData={userData}
            />
          )}
        </div>
        <Separator className={s.separator} />
        <ScrollArea.Root className={s.scrollAreaRoot} type="auto">
          <ScrollArea.Viewport className={s.scrollAreaViewport}>
            <div className={s.comments}>
              <div className={s.user}>
                <div>
                  {userData?.avatar !== null ? (
                    <ImageAva
                      src={userData?.avatar! ? userData?.avatar! : avaWithError}
                      width={36}
                      height={36}
                      alt={'ava'}
                      className={s.ava}
                      priority={true}
                      onError={errorHandler}
                      placeholder="blur"
                    />
                  ) : (
                    <AvatarImage className={s.ava} />
                  )}
                </div>
                <div className={s.postDescription}>
                  <div style={{ display: 'inline-block' }}>
                    <div className={s.userName} style={{ display: 'inline', marginRight: 5 }}>
                      <Typography variant={'h3'} color="primary" style={{ display: 'inline' }}>
                        {userData?.username}
                      </Typography>
                    </div>
                    <Typography variant={'regular14'} style={{ display: 'inline' }}>
                      {description}
                    </Typography>
                  </div>
                </div>
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
                    <div className={s.oneComment}>
                      <div style={{ display: 'inline-block' }}>
                        <div className={s.userName} style={{ display: 'inline', marginRight: 5 }}>
                          <Typography variant={'h3'} color="primary" style={{ display: 'inline' }}>
                            {el.userName + index}
                          </Typography>
                        </div>
                        <Typography variant={'regular14'} style={{ display: 'inline' }}>
                          {el.comment}
                        </Typography>
                      </div>
                    </div>
                    <Heart
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
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className={s.scrollAreaScrollbar} orientation="vertical">
            <ScrollArea.Thumb className={s.scrollAreaThumb} />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
        <Separator className={s.separator} />
        <div className={s.likesArea}>
          <div className={s.iconsArea}>
            <div className={s.heartPlane}>
              <Heart alt={'heart'} width={24} height={24} className={s.icon} />
              <Plane alt={'plane'} width={24} height={24} className={s.icon} />
            </div>
            <div className={s.bookmark}>
              <Bookmark alt={'bookmark'} width={24} height={24} className={s.bookmark} />
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

        {isAuth && (
          <div className={s.addComment}>
            <div className={s.textarea}>
              <ControlledTextArea
                variant="comment"
                control={control}
                className={s.comment}
                name={'addComment'}
                placeholder={t.posts.editPost.comment}
                fullWidth={true}
              />
            </div>

            <Button variant="text" className={s.publishButton}>
              {t.posts.editPost.publish}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
