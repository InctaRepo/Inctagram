import { DialogTitle } from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import React, { ComponentProps, useState } from 'react'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices,@conarti/feature-sliced/absolute-relative
import { Images } from '@/src/features/posts'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { PostDescription } from '@/src/features/posts/createPost/addDescription/postDescription/ui/PostDescription'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profile/service/profileApiTypes'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
// eslint-disable-next-line import/order,@conarti/feature-sliced/absolute-relative,@conarti/feature-sliced/layers-slices,import/no-unresolved
import { PostImages } from '@/src/features/posts/editDeletePost/postImages/ui/PostImages'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { useTranslate } from '@/src/shared/hooks/useTranslate'
import { Typography } from '@/src/shared/ui/typography'
import { AreYouSureDescriptionModal } from '../../../smallModals/ui/AreYouSureDescriptionModal'
import { EditModal } from '../../../ui/EditModal'
import s from './EditDescriptionModal.module.scss'

export type ModalProps = {
  setIsEditDescriptionModalOpen: (isEditDescriptionModalOpen: boolean) => void
  isEditDescriptionModalOpen: boolean
  userName: string
  description?: string
  createdAt: Date
  userData?: UserInfo
  images: Images[]
  id: string
  modalWidth?: string
  isDescription?: boolean
  isEditModalOpen?: boolean
  setIsEditModalOpen: (isEditModalOpen: boolean) => void
} & ComponentProps<'div'>

export const EditDescriptionModal = ({
  setIsEditDescriptionModalOpen,
  isEditDescriptionModalOpen,
  description,
  images,
  id,
  setIsEditModalOpen,
}: ModalProps) => {
  const [openSureDescriptionModal, setOpenSureDescriptionModal] = useState<boolean>(false)

  const [value, setValue] = useState('')
  const { t } = useTranslate()

  const buttonClickHandler = () => {
    setIsEditDescriptionModalOpen(false)
    setIsEditModalOpen(false)
  }

  return (
    <>
      <EditModal
        openSureDescriptionModal={openSureDescriptionModal}
        setOpenSureDescriptionModal={setOpenSureDescriptionModal}
        setIsEditModalOpen={setIsEditModalOpen}
        modalWidth={'edit'}
        open={isEditDescriptionModalOpen}
        onClose={buttonClickHandler}
        isDescription={false}
        setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
      >
        <div className={s.wrapper}>
          <DialogTitle className={s.DialogTitle}>
            <Typography variant={'h1'}>{t.profile.editPost.edit}</Typography>
            <Separator className={s.separator} />

            <div className={s.closeIcon}>
              <AreYouSureDescriptionModal
                openSureDescriptionModal={openSureDescriptionModal}
                setOpenSureDescriptionModal={setOpenSureDescriptionModal}
                setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
              />
            </div>
          </DialogTitle>

          <div className={s.wrapperContent}>
            <div className={s.image}>
              <PostImages images={images} id={id} isDescription={true} />
            </div>
            <PostDescription
              value={value}
              setValue={setValue}
              description={description}
              id={id}
              setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              isDescription={true}
            />
          </div>
        </div>
      </EditModal>
    </>
  )
}
