import React from 'react'
import { useTranslate } from '@/src/shared/hooks/useTranslate'
import { Modal } from '@/src/shared/ui/Modal'
import { Typography } from '@/src/shared/ui/typography'

export type ModalProps = {
  openSureModal: boolean

  setIsModalOpen: (isModalOpen: boolean) => void
  setOpenSureModal: (openSureModal: boolean) => void
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setImage: (image?: string) => void
}

export const AreYouSureModal = ({
  openSureModal,
  setOpenSureModal,
  setIsModalOpen,
  setIsBaseModalOpen,
  setImage,
}: ModalProps) => {
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
        id={'areYouSureModal'}
        modalWidth={'sm'}
        title={t.profile.areYouSure.close}
        open={openSureModal}
        cancelButtonName={t.profile.areYouSure.saveDraft}
        actionButtonName={t.profile.areYouSure.discard}
        onClose={onModalClose}
        onCancel={onModalClose}
        onAction={discardHandler}
      >
        <Typography variant={'h3'}>{t.profile.areYouSure.areYouSure}</Typography>
      </Modal>
    </div>
  )
}
