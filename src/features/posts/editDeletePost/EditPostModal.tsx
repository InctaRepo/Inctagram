import Image from 'next/image'
import React, { ComponentProps, useState } from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices,@conarti/feature-sliced/absolute-relative
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
  callBack: (value: string) => void
} & ComponentProps<'div'>

export const EditPostModal = ({
  openSureDescriptionModal,
  description,
  createdAt,
  userData,
  images,
  id,
  callBack,
  isDescription,
}: ModalProps) => {
  const [isEditDescriptionModalOpen, setIsEditDescriptionModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const username = useAppSelector(getUsername)

  const buttonClickHandler = () => {
    setIsEditModalOpen(false)
  }
  const onClickHandler = () => {
    callBack(id)
  }

  return (
    <div onClick={onClickHandler}>
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
            userName={username ? username : ''}
            userData={userData}
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
          />
        </div>
      </EditModal>
    </div>
  )
}
