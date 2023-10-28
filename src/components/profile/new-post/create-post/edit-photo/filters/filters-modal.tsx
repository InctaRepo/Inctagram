import React, {
  ComponentProps,
  FC,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
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

import s from './filters-modal.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { ArrowBack } from '@/src/assets/icons/arrow-back-icon'
import DescriptionModal from '@/src/components/profile/new-post/create-post/add-description/add-description-modal'
import { PostDescription } from '@/src/components/profile/new-post/create-post/add-description/description/description'
import FilteredImages from '@/src/components/profile/new-post/create-post/add-description/images-with-filters/images-with-filters'
import { ImageType } from '@/src/components/profile/new-post/create-post/create-new-post'
import getFilteredImg from '@/src/components/profile/new-post/create-post/edit-photo/filters/Filter'
import { Button } from '@/src/components/ui/button'
import { Typography } from '@/src/components/ui/typography'
import { useAddPostMutation } from '@/src/services/posts/post-api'

export type ModalProps = {
  image: string | null
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
  addedImages: ImageType[]
  setAddedImages: (addedImages: ImageType[]) => void
  activeFilter: string
  setActiveFilter: (activeFilter: string) => void
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setImage: (image: string | null) => void
  openSureModal: boolean
  setOpenSureModal: (openSureModal: boolean) => void
  setIsModalOpen: (open: boolean) => void
} & ComponentProps<'div'>

const FiltersModal: FC<ModalProps> = ({
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

        // @ts-ignore
        const file = new File([filteredImage], 'photo', { type: 'image/jpeg' })

        formData.append('images', file as File)

        return {
          image: filteredImage,
        }
      })
    )

    formData.append('description', value)

    addPost(formData)
      .unwrap()
      .then(() => {
        setAddedImages(updatedImages)
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
                <DescriptionModal
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
                </DescriptionModal>
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

export default FiltersModal // do not export this , instead use dynamic import "Modal" for js bundle reduce
