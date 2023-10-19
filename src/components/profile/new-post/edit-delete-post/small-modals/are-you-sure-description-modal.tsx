import React, { FC } from 'react'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { CloseIconOutline } from '@/src/assets/icons/close-outline'
import s from '@/src/components/profile/new-post/edit-delete-post/post-description/edit-description/edit-description-modal.module.scss'
import BaseModal from '@/src/components/ui/modals/BaseModal/BaseModal'
import { Typography } from '@/src/components/ui/typography'

export type ModalProps = {
  openSureDescriptionModal: boolean

  setIsEditDescriptionModalOpen: (isEditDescriptionModalOpen: boolean) => void
  setOpenSureDescriptionModal: (openSureDescriptionModal: boolean) => void
}

export const AreYouSureDescriptionModal: FC<ModalProps> = ({
  openSureDescriptionModal,
  setOpenSureDescriptionModal,
  setIsEditDescriptionModalOpen,
}) => {
  const { t } = useTranslate()
  const onModalClose = () => {
    setOpenSureDescriptionModal(false)
  }

  const discardHandler = () => {
    setOpenSureDescriptionModal(false)
    setIsEditDescriptionModalOpen(false)
  }

  return (
    <>
      <div className={s.close} onClick={() => setOpenSureDescriptionModal(true)}>
        <CloseIconOutline />
      </div>
      <div hidden={!openSureDescriptionModal}>
        <BaseModal
          id={'areYouSureDescriptionModal'}
          modalWidth={'sm'}
          title={t.profile.editPost.closePost}
          open={openSureDescriptionModal}
          cancelButtonName={t.profile.editPost.no}
          actionButtonName={t.profile.editPost.yes}
          onClose={onModalClose}
          onCancel={onModalClose}
          onAction={discardHandler}
        >
          <Typography variant={'h3'}>{t.profile.editPost.question}</Typography>
        </BaseModal>
      </div>
    </>
  )
}
