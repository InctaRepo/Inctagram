import React from 'react'

import { useTranslate } from '@/shared/hooks'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

type Props = {
  openSureModal: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  setOpenSureModal: (openSureModal: boolean) => void
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setImage: (image?: string) => void
  handleSaveDraft: () => void
}

export const AreYouSureCreatePostModal = ({
  openSureModal,
  setOpenSureModal,
  setIsModalOpen,
  setIsBaseModalOpen,
  setImage,
  handleSaveDraft,
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
        id={'areYouSureCreatePostModal'}
        modalWidth={'sm'}
        title={t.posts.createPost.close}
        open={openSureModal}
        cancelButtonName={t.posts.createPost.discard}
        actionButtonName={t.posts.createPost.saveDraft}
        onClose={onModalClose}
        onCancel={discardHandler}
        onAction={onSaveDraft}
      >
        <Typography variant={'h3'}>{t.posts.createPost.areYouSure}</Typography>
      </Modal>
    </div>
  )
}
