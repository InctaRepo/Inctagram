import React, { FC } from 'react'

import { Separator } from '@radix-ui/react-separator'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

import s from './right-description.module.scss'

import { useTranslate } from '@/src/assets/hooks'
import bookmark from '@/src/assets/icons/bookmark-outline.svg'
import heart from '@/src/assets/icons/heart-outline.svg'
import plane from '@/src/assets/icons/paper-plane-outline.svg'
import AvatarImage from '@/src/assets/images/avatar-image'
import { Buttons } from '@/src/components/profile/new-post/edit-delete-post/post-description/edit-delete-buttons/buttons'
import { Button } from '@/src/components/ui/button'
import { ControlledTextArea } from '@/src/components/ui/controlled/controlled-text-area'
import { Typography } from '@/src/components/ui/typography'

type PropsType = {
  defaultValue?: string | number
  isEditModalOpen?: boolean
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
}

export const RightDescription: FC<PropsType> = ({
  defaultValue,
  isEditModalOpen,
  setIsEditModalOpen,
}) => {
  const { t } = useTranslate()
  const { control } = useForm()

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.title}>
          <div className={s.user}>
            <div>
              <AvatarImage className={s.ava} />
            </div>
            <div className={s.userName}>
              <Typography variant={'h3'} color="primary">
                User Name
              </Typography>
            </div>
          </div>
          <Buttons isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} />
        </div>
        <Separator className={s.separator} />
        <div className={s.comments}>
          <div className={s.usersComment}>
            <div className={s.user}>
              <div>
                <AvatarImage className={s.ava} />
              </div>
            </div>
            <Typography variant={'regular14'} className={s.oneComment}>
              <div className={s.userName}>
                <Typography variant={'h3'} color="primary">
                  User Name
                </Typography>
              </div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Image src={heart} alt={'heart'} width={16} height={16} className={s.iconForComment} />
          </div>
          <div className={s.usersComment}>
            <div className={s.user}>
              <div>
                <AvatarImage className={s.ava} />
              </div>
            </div>
            <Typography variant={'regular14'} className={s.oneComment}>
              <div className={s.userName}>
                <Typography variant={'h3'} color="primary">
                  User Name
                </Typography>
              </div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Image src={heart} alt={'heart'} width={16} height={16} className={s.iconForComment} />
          </div>
        </div>
        <Separator className={s.separator} />
        <div className={s.likesArea}>
          <div className={s.heartPlane}>
            <Image src={heart} alt={'heart'} width={24} height={24} className={s.icon} />
            <Image src={plane} alt={'plane'} width={24} height={24} className={s.icon} />
          </div>
          <div className={s.bookmark}>
            <Image src={bookmark} alt={'bookmark'} width={24} height={24} className={s.bookmark} />
          </div>
        </div>
        <Separator className={s.separator} />
        <div className={s.addComment}>
          <div className={s.textarea}>
            <ControlledTextArea
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
