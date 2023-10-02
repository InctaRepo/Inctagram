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
import DescriptionModal from '@/src/components/profile/new-post/add-description/add-description-modal'
import { PostDescription } from '@/src/components/profile/new-post/add-description/description/description'
import FilteredImages from '@/src/components/profile/new-post/add-description/images-with-filters/images-with-filters'
import { AreYouSureModal } from '@/src/components/profile/new-post/are-you-sure-modal'
import { ImageType } from '@/src/components/profile/new-post/create-new-post'
import { Button } from '@/src/components/ui/button'
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
  activeFilter: string
  setActiveFilter: (activeFilter: string) => void
  setIsBaseModalOpen: (isBaseModalOpen: boolean) => void
  setImage: (image: string | null) => void
  openSureModal: boolean
  setOpenSureModal: (openSureModal: boolean) => void
} & ComponentProps<'div'>

const FiltersModal: FC<ModalProps> = ({
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
  activeFilter,
  setActiveFilter,
  setIsBaseModalOpen,
  setImage,
  openSureModal,
  setOpenSureModal,
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
  const ref = useRef() as MutableRefObject<HTMLDivElement>
  const filterRef = useRef() as MutableRefObject<HTMLDivElement>
  const [isModalOpen, setIsModalOpen] = useState(true)
  const { t } = useTranslate()
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

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (filterRef.current && !filterRef.current.contains(e.target!)) {
        setOpenSureModal(true)
        console.log(openSureModal)
      }
    }

    document.body.addEventListener('click', handleClickOutside, true)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])
  console.log(openSureModal)

  return (
    <div>
      <Button variant="text" className={s.nextButton} onClick={() => setIsFiltersModalOpen(true)}>
        {t.profile.next}
      </Button>
      <Dialog open={isFiltersModalOpen}>
        <DialogPortal>
          <DialogOverlay className={s.DialogOverlay} />
          <DialogContent className={classNames.content}>
            <div ref={filterRef}>
              <div className={s.titleWrapper}>
                <button className={s.arrowButton} onClick={onBackHandler}>
                  <ArrowBack />
                </button>
                <div className={s.next}>
                  <DescriptionModal
                    open={isModalOpen}
                    onCancel={cancelButtonHandler}
                    title={t.profile.addNewPost.publication}
                    isFiltersModalOpen={isFiltersModalOpen}
                    setIsFiltersModalOpen={setIsFiltersModalOpen}
                  >
                    <FilteredImages addedImages={addedImages} activeFilter={activeFilter} />
                    <PostDescription />
                  </DescriptionModal>
                </div>

                <DialogTitle className={s.DialogTitle}>
                  <Typography variant={'h1'}>{title}</Typography>
                  <Separator className={classNames.separator} />
                </DialogTitle>
              </div>
              <div className={s.contentBox}>{children}</div>
            </div>
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
