import React, { ComponentProps, useState } from 'react'

import { DialogTitle } from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'

import { PostImages } from '@/src/entities/post/postImages'
import { AreYouSureDescriptionModal } from '@/src/entities/post/showPostModal/editModal/areYouSureDescriptionModal'
import { EditModal } from '@/src/entities/post/showPostModal/editModal/EditModal'
import { Images } from '@/src/features/posts'
import { PostDescription } from '@/src/features/posts/createPost/addDescription/postDescription'
import s from '@/src/features/posts/editDeletePost/postDescription/editDescription/ui/editDescriptionModal.module.scss'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profileSettings/service'
import { useTranslate } from '@/src/shared/hooks'
import { Typography } from '@/src/shared/ui/typography'

export type ModalProps = {
  setIsEditDescriptionModalOpen: (isEditDescriptionModalOpen: boolean) => void
  isEditDescriptionModalOpen: boolean
  userName?: string
  description?: string
  createdAt?: Date
  userData?: UserInfo
  images?: Images[]
  id: string | string[] | undefined
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
              <PostImages images={images} isDescription={true} />
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
