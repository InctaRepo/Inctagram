import { Dialog, DialogContent, DialogOverlay, DialogPortal } from '@radix-ui/react-dialog'
import { clsx } from 'clsx'
import Image from 'next/image'
import React, { ComponentProps, ReactNode, useState } from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices,import/order
import { getAuthUser } from '@/src/features/auth/authService'

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
  openSureDescriptionModal?: boolean
  isDescription?: boolean
  description?: string
  createdAt: Date
  userData?: UserInfo
  images: Images[]
  id: string
  modalWidth: string
} & ComponentProps<'div'>

export const EditPostModal = ({
  openSureDescriptionModal,
  description,
  createdAt,
  userData,
  images,
  id,
  isDescription,
}: ModalProps) => {
  const [isEditDescriptionModalOpen, setIsEditDescriptionModalOpen] = useState(false)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const user = useAppSelector(getAuthUser)

  const buttonClickHandler = () => {
    setIsEditModalOpen(false)
  }

  return (
    <>
      <Image
        src={images[0]?.url ? images[0].url : ''}
        width={234}
        height={228}
        alt={'post'}
        onClick={() => setIsEditModalOpen(true)}
      />
      <EditModal
        openSureDescriptionModal={openSureDescriptionModal ? openSureDescriptionModal : false}
        modalWidth={'edit'}
        open={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        onClose={buttonClickHandler}
        isDescription={!isEditDescriptionModalOpen}
      >
        <div className={s.wrapper}>
          <PostImages images={images} id={id} />
          <RightDescription
            openSureDescriptionModal={openSureDescriptionModal ? openSureDescriptionModal : false}
            setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
            isEditDescriptionModalOpen={isEditDescriptionModalOpen}
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
