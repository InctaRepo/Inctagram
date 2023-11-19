import Image from 'next/image'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import dots from '@/src/assets/icons/dots.svg'
import { useTranslate } from '@/src/shared/hooks'
import { PostDescription } from '../../../createPost/addDescription/postDescription/PostDescription'
import { PostImages } from '../../../editDeletePost/postPhotos/PostPhotos'
import { DeleteModal } from '../../smallModals/DeleteModal'
import s from '../editDeleteButtons/Buttons.module.scss'
import { EditDescriptionModal } from '../editDescription/EditDescriptionModal'

type Props = {
  isEditModalOpen?: boolean
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
}

export const Buttons = ({ isEditModalOpen, setIsEditModalOpen }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const editRef = useRef() as MutableRefObject<HTMLDivElement>
  const { t } = useTranslate()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (editRef.current && !e.composedPath().includes(editRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={editRef}>
      <div onClick={() => setIsOpen(true)} className={s.editBtn}>
        <Image src={dots} alt={'dots'} width={24} height={24} className={s.blue} />
      </div>
      {isOpen && (
        <div className={s.editOptions}>
          <EditDescriptionModal
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
          >
            <div className={s.wrapper}>
              <PostImages />
              <PostDescription />
            </div>
          </EditDescriptionModal>

          <div>
            <DeleteModal
              setIsEditModalOpen={setIsEditModalOpen}
              openDeleteModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          </div>
        </div>
      )}
    </div>
  )
}
