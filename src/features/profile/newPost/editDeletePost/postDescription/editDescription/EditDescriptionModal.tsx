import { DialogTitle } from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import Image from 'next/image'
import React, { ComponentProps, useState } from 'react'
import edit from '@/src/assets/icons/edit.svg'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Images } from '@/src/features/posts'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { PostImages } from '@/src/features/profile/newPost/editDeletePost/postImages/PostImages'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { UserInfo } from '@/src/features/profile/service/profileApiTypes'
import { useTranslate } from '@/src/shared/hooks/useTranslate'
import { Typography } from '@/src/shared/ui/typography'
import s from '../../postDescription/editDescription/EditDescriptionModal.module.scss'
import { AreYouSureDescriptionModal } from '../../smallModals/AreYouSureDescriptionModal'
import { EditModal } from '../../ui/EditModal'
import { RightDescription } from '../RightDescription'

export type ModalProps = {
  userName: string
  description?: string
  createdAt: Date
  userData: UserInfo
  images: Images[]
  id: string
  modalWidth?: string
  isEditModalOpen?: boolean
  setIsEditModalOpen: (isEditModalOpen: boolean) => void
} & ComponentProps<'div'>

export const EditDescriptionModal = ({
  userName,
  description,
  createdAt,
  userData,
  images,
  id,
  isEditModalOpen,
  setIsEditModalOpen,
}: ModalProps) => {
  const [isEditDescriptionModalOpen, setIsEditDescriptionModalOpen] = useState(false)
  const [openSureDescriptionModal, setOpenSureDescriptionModal] = useState<boolean>(false)

  const { t } = useTranslate()

  const openEditHandler = () => {
    setIsEditDescriptionModalOpen(true)
    setIsEditModalOpen(false)
  }
  //  onOpenChange={open => !open && setOpenSureDescriptionModal(true)}

  const buttonClickHandler = () => {
    setIsEditDescriptionModalOpen(false)
  }

  return (
    <>
      <div className={s.editOption1} onClick={openEditHandler}>
        <Image src={edit} alt={'edit'} width={24} height={24} />
        <Typography variant={'regular14'}>{t.profile.profileSetting.edit}</Typography>
      </div>
      <EditModal modalWidth={'edit'} open={isEditDescriptionModalOpen} onClose={buttonClickHandler}>
        <div className={s.wrapper}>
          <DialogTitle className={s.DialogTitle}>
            <Typography variant={'h1'}>{t.profile.editPost.edit}</Typography>
            <Separator className={s.separator} />
          </DialogTitle>
          <div>
            <AreYouSureDescriptionModal
              openSureDescriptionModal={openSureDescriptionModal}
              setOpenSureDescriptionModal={setOpenSureDescriptionModal}
              setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
            />
          </div>

          <div className={s.wrapper}>
            <PostImages images={images} id={id} />
            <RightDescription
              description={description}
              createdAt={createdAt}
              userName={userName}
              userData={userData}
              isEditModalOpen={isEditModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          </div>
          <div>
            <AreYouSureDescriptionModal
              openSureDescriptionModal={openSureDescriptionModal}
              setOpenSureDescriptionModal={setOpenSureDescriptionModal}
              setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
            />
          </div>
        </div>
      </EditModal>
    </>
  )
}
