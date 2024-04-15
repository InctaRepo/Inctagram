import React, { ComponentProps, useState } from 'react'

import { PostImages } from '@/entities/post/postImages'
import { EditModal } from '@/entities/post/showPostModal/editModal'
import { AreYouSureDescriptionModal } from '@/entities/post/showPostModal/editModal/areYouSureDescriptionModal'
import { UserInfo } from '@/entities/profile/service'
import { Images } from '@/features/posts'
import { PostDescription } from '@/features/posts/createPost/addDescription/postDescription'
import { useTranslate } from '@/shared/hooks'
import { Typography } from '@/ui/typography'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'

import s from '@/features/posts/editDeletePost/postDescription/editDescription/ui/editDescriptionModal.module.scss'

type Props = {
  createdAt?: Date
  description?: string
  id: string | string[] | undefined
  images?: Images[]
  isDescription?: boolean
  isEditDescriptionModalOpen: boolean
  isEditModalOpen?: boolean
  modalWidth?: string
  setIsEditDescriptionModalOpen: (isEditDescriptionModalOpen: boolean) => void
  setIsEditModalOpen: (isEditModalOpen: boolean) => void
  userData?: UserInfo
} & ComponentProps<'div'>

export const EditDescriptionModal = ({
  description,
  id,
  images,
  isEditDescriptionModalOpen,
  setIsEditDescriptionModalOpen,
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
        isDescription={false}
        onClose={buttonClickHandler}
        open={isEditDescriptionModalOpen}
        openSureDescriptionModal={openSureDescriptionModal}
        setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        setOpenSureDescriptionModal={setOpenSureDescriptionModal}
      >
        <div className={s.wrapper}>
          <DialogTitle className={s.DialogTitle}>
            <Typography variant={'h1'}>{t.posts.editPost.edit}</Typography>
            <Separator className={s.separator} />

            <div className={s.closeIcon}>
              <AreYouSureDescriptionModal
                openSureDescriptionModal={openSureDescriptionModal}
                setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                setOpenSureDescriptionModal={setOpenSureDescriptionModal}
              />
            </div>
          </DialogTitle>

          <div className={s.wrapperContent}>
            <div className={s.image}>
              <PostImages images={images} isDescription />
            </div>
            <PostDescription
              description={description}
              isDescription
              postId={id}
              setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              setValue={setValue}
              value={value}
            />
          </div>
        </div>
      </EditModal>
    </>
  )
}
