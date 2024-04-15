import React from 'react'

import { useTranslate } from '@/shared/hooks'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

type Props = {
  handleSaveDraft: () => void
  openSureModal: boolean
  setImage: (image?: string) => void
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setIsModalOpen: (isModalOpen: boolean) => void
  setOpenSureModal: (openSureModal: boolean) => void
}

export const AreYouSureCreatePostModal = ({
  handleSaveDraft,
  openSureModal,
  setImage,
  setIsBaseModalOpen,
  setIsModalOpen,
  setOpenSureModal,
}: Props) => {
  const { t } = useTranslate()

  const onSaveDraft = () => {
    handleSaveDraft()
    setOpenSureModal(false)
  }

  const onModalClose = () => {
    setOpenSureModal(false)
  }

  const discardHandler = () => {
    setOpenSureModal(false)
    setIsModalOpen(false)
    setIsBaseModalOpen(true)
    setImage(undefined)
  }

  return (
    <div hidden={!openSureModal}>
      <Modal
        actionButtonName={t.posts.createPost.saveDraft}
        cancelButtonName={t.posts.createPost.discard}
        id={'areYouSureCreatePostModal'}
        modalWidth={'sm'}
        onAction={onSaveDraft}
        onCancel={discardHandler}
        onClose={onModalClose}
        open={openSureModal}
        title={t.posts.createPost.close}
      >
        <Typography variant={'h3'}>{t.posts.createPost.areYouSure}</Typography>
      </Modal>
    </div>
  )
}
