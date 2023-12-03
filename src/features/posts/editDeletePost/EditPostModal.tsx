import Image from 'next/image'
import React, { ComponentProps, useState } from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices,@conarti/feature-sliced/absolute-relative
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative,@conarti/feature-sliced/layers-slices
import { getIsAuth } from '@/src/features/auth/authService'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { useGetUserPostQuery } from '@/src/features/posts'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { PostImages } from '@/src/features/posts/editDeletePost/postImages/ui/PostImages'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { Images } from '@/src/features/posts/service/postApiTypes'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative,@conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profile/service/profileApiTypes'
import { getUsername } from '@/src/shared/hoc/model/selectors/getUsername/getUsername'
import { useAppSelector } from '@/src/shared/hooks'
import s from './EditPostModal.module.scss'
import { RightDescription } from './postDescription/ui/RightDescription'
import { EditModal } from './ui/EditModal'

export type ModalProps = {
  openSureDescriptionModal?: boolean
  isDescription?: boolean
  description?: string
  createdAt?: Date
  userData?: UserInfo
  images?: Images[]
  id?: string | (string[] & string) | undefined
  modalWidth?: string
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
  const username = useAppSelector(getUsername)
  const isAuth = useAppSelector(getIsAuth)
  const { data: post } = useGetUserPostQuery('6ec102f6-8df9-4b71-bd83-f90e16b396d6')

  const buttonClickHandler = () => {
    setIsEditModalOpen(false)
  }

  return (
    <div>
      {isAuth && (
        <Image
          src={images ? images[0].url : ''}
          width={234}
          height={228}
          alt={'post'}
          onClick={() => setIsEditModalOpen(true)}
          priority={true}
        />
      )}
      <EditModal
        openSureDescriptionModal={openSureDescriptionModal ? openSureDescriptionModal : false}
        modalWidth={'edit'}
        open={isAuth ? isEditModalOpen : true}
        setIsEditModalOpen={setIsEditModalOpen}
        onClose={buttonClickHandler}
        isDescription={!isEditDescriptionModalOpen}
      >
        <div className={s.wrapper}>
          <PostImages images={images ? images : post?.data.images} id={id} />
          <RightDescription
            openSureDescriptionModal={openSureDescriptionModal ? openSureDescriptionModal : false}
            setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
            isEditDescriptionModalOpen={isEditDescriptionModalOpen}
            images={images ? images : post?.data.images}
            id={id}
            description={description ? description : post?.data.description}
            createdAt={createdAt ? createdAt : post?.data.createdAt}
            userName={userData?.username}
            userData={userData}
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
          />
        </div>
      </EditModal>
    </div>
  )
}
