import React, {
  ComponentProps,
  FC,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  MutableRefObject,
} from 'react'

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'

import s from './crop-modal.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { ArrowBack } from '@/src/assets/icons/arrow-back-icon'
import { AreYouSureModal } from '@/src/components/profile/new-post/create-post/are-you-sure/are-you-sure-modal'
import { ImageType } from '@/src/components/profile/new-post/create-post/create-new-post'
import FiltersModal from '@/src/components/profile/new-post/edit-photo/filters/filters-modal'
import SelectedImages from '@/src/components/profile/new-post/edit-photo/filters/selected-images/selected-images'
import BaseModal from '@/src/components/ui/modals/BaseModal/BaseModal'
import { Typography } from '@/src/components/ui/typography'

export type ModalProps = {
  image: string | null
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
  addedImages: ImageType[]
  setAddedImages: (addedImages: ImageType[]) => void
  isBaseModalOpen: boolean
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setImage: (image: string | null) => void
} & ComponentProps<'div'>

const CropModal: FC<ModalProps> = ({
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
}) => {
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
                    open={isModalOpen}
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

export default CropModal // do not export this , instead use dynamic import "Modal" for js bundle reduce
