import React, { ComponentProps, useState } from 'react'

import { DialogTitle } from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'

import { PostImages } from '@/entities/post/postImages'
import { AreYouSureDescriptionModal } from '@/entities/post/showPostModal/editModal/areYouSureDescriptionModal'
import { EditModal } from '@/entities/post/showPostModal/editModal/EditModal'
import { UserInfo } from '@/entities/profile/service'
import { Images } from '@/features/posts'
import { PostDescription } from '@/features/posts/createPost/addDescription/postDescription'
import s from '@/features/posts/editDeletePost/postDescription/editDescription/ui/editDescriptionModal.module.scss'
import { useTranslate } from '@/shared/hooks'
import { Typography } from '@/ui/typography'

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
            <Typography variant={'h1'}>{t.posts.editPost.edit}</Typography>
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
              postId={id}
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
