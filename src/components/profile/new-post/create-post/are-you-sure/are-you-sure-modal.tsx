import React, { FC } from 'react'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import BaseModal from '@/src/components/ui/modals/BaseModal/BaseModal'
import { Typography } from '@/src/components/ui/typography'

export type ModalProps = {
  openSureModal: boolean

  setIsModalOpen: (isModalOpen: boolean) => void
  setOpenSureModal: (openSureModal: boolean) => void
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setImage: (image?: string) => void
}

export const AreYouSureModal: FC<ModalProps> = ({
  openSureModal,
  setOpenSureModal,
  setIsModalOpen,
  setIsBaseModalOpen,
  setImage,
}) => {
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
      <BaseModal
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
      </BaseModal>
    </div>
  )
}
