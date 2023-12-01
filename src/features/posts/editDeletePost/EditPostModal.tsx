import Image from 'next/image'
import React, { ComponentProps, useState } from 'react'
import { Images } from '../../posts'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '../../profile/service/profileApiTypes'
import { PostImages } from '../editDeletePost/postImages/ui/PostImages'
import s from './EditPostModal.module.scss'
import { RightDescription } from './postDescription/ui/RightDescription'
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
  // const user = useAppSelector(getAuthUser)

  const buttonClickHandler = () => {
    setIsEditModalOpen(false)
  }
  const onClickHandler = () => {
    callBack(id)
  }

  return (
    <div onClick={onClickHandler}>
      {images[0]?.url && (
        <Image
          src={images[0].url}
          width={234}
          height={228}
          alt={'post'}
          onClick={() => setIsEditModalOpen(true)}
        />
      )}

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
            userName={userData ? userData.username : ''}
            userData={userData}
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
          />
        </div>
      </EditModal>
    </div>
  )
}
