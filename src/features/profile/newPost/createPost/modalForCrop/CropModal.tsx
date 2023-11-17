import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'
import React, { ComponentProps, ReactNode, useRef, useState } from 'react'
import { ArrowBack } from '@/src/assets/icons/arrow-back-icon'
import { useTranslate } from '@/src/shared/hooks/useTranslate'
import { Typography } from '@/src/shared/ui/typography'
import SelectedImages from '../../createPost/editPhoto/filters/selected-images/selectedImages'
import { AreYouSureModal } from '../areYouSure/AreYouSureModal'
import { Image } from '../CreateNewPost'
import FiltersModal from '../editPhoto/filters/FiltersModal'
import s from '../modalForCrop/CropModal.module.scss'

export type ModalProps = {
  image?: string
  open: boolean
  onClose?: () => void
  onAction?: () => void
  onCancel?: () => void
  cancelButtonName?: string // if no props , visibility = hidden
  actionButtonName?: string // if no props , visibility = hidden
  showSeparator?: boolean // if no props with false , visibility = visible
  title?: string
  children?: ReactNode
  className?: string
  addedImages: Image[]
  setAddedImages: (addedImages: Image[]) => void
  isBaseModalOpen: boolean
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setImage: (image: string | undefined) => void
} & ComponentProps<'div'>

const CropModal = ({
  image,
  showSeparator = true,
  onAction,
  onCancel,
  open,
  cancelButtonName,
  actionButtonName,
  title,
  className,
  children,
  addedImages,
  setAddedImages,
  isBaseModalOpen,
  setIsBaseModalOpen,
  setImage,
}: ModalProps) => {
  const classNames = {
    content: getContentClassName(className),
    separator: clsx(s.separator, !showSeparator && s.separatorHide),
    actionButton: clsx(s.widePaddingButton, !actionButtonName && s.actionButtonHide),
    cancelButton: clsx(
      s.widePaddingButton,
      !cancelButtonName && s.cancelButtonHide,
      s.actionButton
    ),
  }
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [activeFilter, setActiveFilter] = useState('')
  const [openSureModal, setOpenSureModal] = useState<boolean>(false)
  const areYouSureRef = useRef(null)

  const { t } = useTranslate()
  const actionButtonHandler = () => {
    onAction?.()
  }
  const cancelButtonHandler = () => {
    onCancel?.()
  }

  function onCancelHandler() {
    setIsModalOpen(false)
    setIsBaseModalOpen(true)
    setAddedImages([])
  }

  return (
    <div>
      {isModalOpen && (
        <Dialog open={open} onOpenChange={open => !open && setOpenSureModal(true)}>
          <DialogPortal>
            <DialogOverlay className={s.DialogOverlay} />
            <DialogContent className={classNames.content}>
              <div className={s.titleWrapper} id={'titleWrap'}>
                <button className={s.arrowButton} onClick={onCancelHandler}>
                  <ArrowBack />
                </button>
                <div className={s.nextButton}>
                  <FiltersModal
                    image={image}
                    addedImages={addedImages}
                    setAddedImages={setAddedImages}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onCancel={cancelButtonHandler}
                    title={t.profile.addNewPost.filters}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    setIsBaseModalOpen={setIsBaseModalOpen}
                    setImage={setImage}
                    openSureModal={openSureModal}
                    setOpenSureModal={setOpenSureModal}
                  >
                    <SelectedImages
                      image={image}
                      addedImages={addedImages}
                      setActiveFilter={setActiveFilter}
                      activeFilter={activeFilter}
                      setAddedImages={setAddedImages}
                    />
                  </FiltersModal>
                </div>
                <DialogTitle className={s.DialogTitle}>
                  <Typography variant={'h1'}>{title}</Typography>
                  <Separator className={classNames.separator} />
                </DialogTitle>
              </div>
              <div ref={areYouSureRef}>
                <AreYouSureModal
                  openSureModal={openSureModal}
                  setOpenSureModal={setOpenSureModal}
                  setIsModalOpen={setIsModalOpen}
                  setIsBaseModalOpen={setIsBaseModalOpen}
                  setImage={setImage}
                />
              </div>
              <div className={s.contentBox}>{children}</div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </div>
  )
}

function getContentClassName(className?: string) {
  return clsx(className, s.DialogContent)
}

export default CropModal
