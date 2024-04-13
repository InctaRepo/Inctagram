import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { PostMenu } from '@/entities/post/postMenu'
import { fakeComments } from '@/entities/post/showPostModal/editModal/rightDescription/fakeComments'
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
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Separator } from '@radix-ui/react-separator'
import ImageAva from 'next/image'

import s from '@/entities/post/showPostModal/editModal/rightDescription/rightDescription.module.scss'

type Props = {
  createdAt?: Date
  description?: string
  id: string
  images?: Images[]
  isEditDescriptionModalOpen: boolean
  isEditModalOpen?: boolean
  openSureDescriptionModal: boolean
  setIsEditDescriptionModalOpen: (isEditDescriptionModalOpen: boolean) => void
  setIsEditModalOpen: (isEditModalOpen: boolean) => void
  userData?: UserInfo
}

export const RightDescription = ({
  createdAt,
  description,
  id,
  images,
  isEditDescriptionModalOpen,
  isEditModalOpen,
  openSureDescriptionModal,
  setIsEditDescriptionModalOpen,
  setIsEditModalOpen,
  userData,
}: Props) => {
  const { t } = useTranslate()
  const { control } = useForm()
  const [isAvaBroken, setIsAvaBroken] = useState(false)
  const [isLikeActive, setIsLikeActive] = useState(false)
  const isAuth = useAppSelector(getIsAuth)
  const dateOfPost = new Date(createdAt ? createdAt : '').toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
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
                  alt={'ava'}
                  className={s.ava}
                  height={36}
                  onError={errorHandler}
                  priority
                  src={userData?.avatar! ? userData?.avatar! : avaWithError}
                  width={36}
                />
              ) : (
                <AvatarImage className={s.ava} />
              )}
            </div>
            <div className={s.userNameHead}>
              <Typography color={'primary'} variant={'h3'}>
                {userData?.username}
              </Typography>
            </div>
          </div>
          {isAuth && (
            <PostMenu
              createdAt={createdAt}
              description={description}
              id={id}
              images={images}
              isEditDescriptionModalOpen={isEditDescriptionModalOpen}
              isEditModalOpen={isEditModalOpen}
              openSureDescriptionModal={openSureDescriptionModal}
              setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              userData={userData}
            />
          )}
        </div>
        <Separator className={s.separator} />
        <ScrollArea.Root className={s.scrollAreaRoot} type={'auto'}>
          <ScrollArea.Viewport className={s.scrollAreaViewport}>
            <div className={s.comments}>
              <div className={s.user}>
                <div>
                  {userData?.avatar !== null ? (
                    <ImageAva
                      alt={'ava'}
                      className={s.ava}
                      height={36}
                      onError={errorHandler}
                      priority
                      src={userData?.avatar! ? userData?.avatar! : avaWithError}
                      width={36}
                    />
                  ) : (
                    <AvatarImage className={s.ava} />
                  )}
                </div>
                <div className={s.postDescription}>
                  <div style={{ display: 'inline-block' }}>
                    <div className={s.userName} style={{ display: 'inline', marginRight: 5 }}>
                      <Typography color={'primary'} style={{ display: 'inline' }} variant={'h3'}>
                        {userData?.username}
                      </Typography>
                    </div>
                    <Typography style={{ display: 'inline' }} variant={'regular14'}>
                      {description}
                    </Typography>
                  </div>
                </div>
              </div>
              <Typography className={s.time} color={'secondary'} variant={'small'}>
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
                          <Typography
                            color={'primary'}
                            style={{ display: 'inline' }}
                            variant={'h3'}
                          >
                            {el.userName + index}
                          </Typography>
                        </div>
                        <Typography style={{ display: 'inline' }} variant={'regular14'}>
                          {el.comment}
                        </Typography>
                      </div>
                    </div>
                    <Heart
                      alt={'heart'}
                      className={isLikeActive ? s.red : s.iconForComment}
                      height={16}
                      onClick={handleLike}
                      width={16}
                    />
                  </div>
                  <Typography className={s.time} color={'secondary'} variant={'small'}>
                    {el.grayText}
                  </Typography>
                </div>
              ))}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className={s.scrollAreaScrollbar} orientation={'vertical'}>
            <ScrollArea.Thumb className={s.scrollAreaThumb} />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
        <Separator className={s.separator} />
        <div className={s.likesArea}>
          <div className={s.iconsArea}>
            <div className={s.heartPlane}>
              <Heart alt={'heart'} className={s.icon} height={24} width={24} />
              <Plane alt={'plane'} className={s.icon} height={24} width={24} />
            </div>
            <div className={s.bookmark}>
              <Bookmark alt={'bookmark'} className={s.bookmark} height={24} width={24} />
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
                <Typography variant={'regular14'}>2 234 </Typography>
                <Typography className={s.boldText} variant={'bold14'}>
                  Like
                </Typography>
              </div>
            </div>
            <Typography color={'secondary'} variant={'small'}>
              {dateOfPost}
            </Typography>
          </div>
        </div>
        <Separator className={s.separator} />

        {isAuth && (
          <div className={s.addComment}>
            <div className={s.textarea}>
              <ControlledTextArea
                className={s.comment}
                control={control}
                fullWidth
                name={'addComment'}
                placeholder={t.posts.editPost.comment}
                variant={'comment'}
              />
            </div>

            <Button className={s.publishButton} variant={'text'}>
              {t.posts.editPost.publish}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
