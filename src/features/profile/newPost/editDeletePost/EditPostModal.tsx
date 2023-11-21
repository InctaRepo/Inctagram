import { Dialog, DialogContent, DialogOverlay, DialogPortal } from '@radix-ui/react-dialog'
import { clsx } from 'clsx'
import Image from 'next/image'
import React, { ComponentProps, ReactNode, useState } from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices,import/order
import { authUserSelector } from '@/src/features/auth/authService'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Images } from '@/src/features/posts/postApiTypes'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { PostImages } from '@/src/features/profile/newPost/editDeletePost/postImages/PostImages'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative,import/namespace
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { UserInfo } from '@/src/features/profile/service/profileApiTypes'
import { useAppSelector } from '@/src/shared/hooks'
import { AddDescriptionModal } from '../createPost/addDescription/AddDescriptionModal'
import { RightDescription } from '../editDeletePost/postDescription/RightDescription'
import s from './EditPostModal.module.scss'
// eslint-disable-next-line import/namespace
import { EditModal } from './ui/EditModal'

export type ModalProps = {
  description?: string
  createdAt: Date
  userData: UserInfo
  images: Images[]
  id: string
  modalWidth: string
} & ComponentProps<'div'>

export const EditPostModal = ({ description, createdAt, userData, images, id }: ModalProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [openSureDescriptionModal, setOpenSureDescriptionModal] = useState(false)
  const user = useAppSelector(authUserSelector)

  const buttonClickHandler = () => {
    setIsEditModalOpen(false)
  }

  return (
    <>
      <Image
        src={images[0].url}
        width={234}
        height={228}
        alt={'post'}
        onClick={() => setIsEditModalOpen(true)}
      />
      <EditModal modalWidth={'edit'} open={isEditModalOpen} onClose={buttonClickHandler}>
        <div className={s.wrapper}>
          <PostImages images={images} id={id} />
          <RightDescription
            images={images}
            id={id}
            description={description}
            createdAt={createdAt}
            userName={user.username}
            userData={userData}
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
          />
        </div>
      </EditModal>
    </>
  )
}
