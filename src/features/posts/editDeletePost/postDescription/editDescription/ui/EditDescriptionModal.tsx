import React, { ComponentProps, useState } from 'react'

import { DialogTitle } from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'

import { PostImages } from '@/entities/post/postImages'
import { EditModal } from '@/entities/post/showPostModal/editModal'
import { AreYouSureDescriptionModal } from '@/entities/post/showPostModal/editModal/areYouSureDescriptionModal'
import { UserInfo } from '@/entities/profile/service'
import { Images } from '@/features/posts'
import { PostDescription } from '@/features/posts/createPost/addDescription/postDescription'
import s from '@/features/posts/editDeletePost/postDescription/editDescription/ui/editDescriptionModal.module.scss'
import { useTranslate } from '@/shared/hooks'
import { Typography } from '@/ui/typography'

type Props = {
  setIsEditDescriptionModalOpen: (isEditDescriptionModalOpen: boolean) => void
  isEditDescriptionModalOpen: boolean
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
}: Props) => {
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
