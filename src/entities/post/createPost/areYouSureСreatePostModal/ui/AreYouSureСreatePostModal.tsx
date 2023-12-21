import React from 'react'

import { useTranslate } from '@/src/shared/hooks'
import { Typography } from '@/src/shared/ui/typography'
import { Modal } from 'src/shared/ui/modal'

type Props = {
  openSureModal: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  setOpenSureModal: (openSureModal: boolean) => void
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setImage: (image?: string) => void
}

export const AreYouSureCreatePostModal = ({
  openSureModal,
  setOpenSureModal,
  setIsModalOpen,
  setIsBaseModalOpen,
  setImage,
}: Props) => {
  const { t } = useTranslate()
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
        title={t.profile.addNewPost.close}
        open={openSureModal}
        cancelButtonName={t.profile.addNewPost.saveDraft}
        actionButtonName={t.profile.addNewPost.discard}
        onClose={onModalClose}
        onCancel={onModalClose}
        onAction={discardHandler}
      >
        <Typography variant={'h3'}>{t.profile.addNewPost.areYouSure}</Typography>
      </Modal>
    </div>
  )
}
