import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'
import React, { ComponentProps, ReactNode, useState } from 'react'
import { ArrowBack } from '@/src/assets/icons/arrow-back-icon'
//TODO
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useAddPostMutation } from '@/src/features/posts'
import { useTranslate } from '@/src/shared/hooks/useTranslate'
import { Button } from '@/src/shared/ui/button'
import { Typography } from '@/src/shared/ui/typography'
import { AddDescriptionModal } from '../../addDescription/AddDescriptionModal'
import { FilteredImages } from '../../addDescription/filteredImages/FilteredImages'
import { PostDescription } from '../../addDescription/postDescription/PostDescription'
import { Image } from '../../CreateNewPost'
import getFilteredImg from '../filters/Filter'
import s from './FiltersModal.module.scss'

export type ModalProps = {
  image?: string
  isModalOpen: boolean
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
  activeFilter: string
  setActiveFilter: (activeFilter: string) => void
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setImage: (image: string | undefined) => void
  openSureModal: boolean
  setOpenSureModal: (openSureModal: boolean) => void
  setIsModalOpen: (open: boolean) => void
} & ComponentProps<'div'>

const FiltersModal = ({
  image,
  showSeparator = true,
  onAction,
  onCancel,
  isModalOpen,
  cancelButtonName,
  actionButtonName,
  title,
  className,
  children,
  addedImages,
  setAddedImages,
  activeFilter,
  setActiveFilter,
  setOpenSureModal,
  setIsBaseModalOpen,
  setIsModalOpen,
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
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false)
  const [value, setValue] = useState('')
  const { t } = useTranslate()
  const [addPost] = useAddPostMutation()
  const actionButtonHandler = () => {
    onAction?.()
  }
  const cancelButtonHandler = () => {
    onCancel?.()
  }

  function onBackHandler() {
    setIsFiltersModalOpen(false)
    setIsModalOpen(true)
  }

  const handleNext = () => {
    setIsFiltersModalOpen(true)
    setIsBaseModalOpen(false)
    //setIsModalOpen(false)
  }
  const formData = new FormData()
  const sendFilteredImg = async (activeFilter: string) => {
    const updatedImages = await Promise.all(
      addedImages.map(async (el, idx) => {
        const filteredImage = await getFilteredImg(el.image, activeFilter)

        if (!filteredImage) {
          return null
        }
        const file = new File([filteredImage], 'photo', { type: 'image/jpeg' })

        formData.append('images', file)

        return {
          image: filteredImage,
        }
      })
    )

    formData.append('description', value)

    addPost(formData)
      .unwrap()
      .then(() => {
        //setAddedImages(updatedImages)
        setActiveFilter('')
        setIsFiltersModalOpen(false)
        setIsDescriptionModalOpen(false)
        setIsModalOpen(false)
      })
  }

  return (
    <div>
      <Button variant="text" className={s.nextButton} onClick={handleNext}>
        {t.profile.next}
      </Button>
      <Dialog open={isFiltersModalOpen} onOpenChange={open => !open && setOpenSureModal(true)}>
        <DialogPortal>
          <DialogOverlay className={s.DialogOverlay} />
          <DialogContent className={classNames.content}>
            <div className={s.titleWrapper}>
              <button className={s.arrowButton} onClick={onBackHandler}>
                <ArrowBack />
              </button>
              <div className={s.next}>
                <AddDescriptionModal
                  image={image}
                  addedImages={addedImages}
                  setAddedImages={setAddedImages}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  onCancel={cancelButtonHandler}
                  title={t.profile.addNewPost.publication}
                  isFiltersModalOpen={isFiltersModalOpen}
                  setIsFiltersModalOpen={setIsFiltersModalOpen}
                  setOpenSureModal={setOpenSureModal}
                  isDescriptionModalOpen={isDescriptionModalOpen}
                  setIsDescriptionModalOpen={setIsDescriptionModalOpen}
                  sendFilteredImg={sendFilteredImg}
                >
                  <FilteredImages addedImages={addedImages} activeFilter={activeFilter} />
                  <PostDescription value={value} setValue={setValue} addedImages={addedImages} />
                </AddDescriptionModal>
              </div>

              <DialogTitle className={s.DialogTitle}>
                <Typography variant={'h1'}>{title}</Typography>
                <Separator className={classNames.separator} />
              </DialogTitle>
            </div>
            <div className={s.contentBox}>{children}</div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  )
}

function getContentClassName(className?: string) {
  return clsx(className, s.DialogContent)
}

export default FiltersModal
