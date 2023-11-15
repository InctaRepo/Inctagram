import React, { FC, useState, useRef, useEffect, MutableRefObject } from 'react'

import Image from 'next/image'

import s from './buttons111.module.scss'

import { useTranslate } from '@/src/assets/hooks'
import dots from '@/src/assets/icons/dots.svg'
import { PostDescription } from '@/src/components/profile/new-post/create-post/add-description/description/description111'
import { EditDescriptionModal } from '@/src/components/profile/new-post/edit-delete-post/post-description/edit-description/EditDescriptionModal'
import { PostImages } from '@/src/components/profile/new-post/edit-delete-post/post-photos/PostPhotos'
import { DeleteModal } from '@/src/components/profile/new-post/edit-delete-post/small-modals/DeleteModal'

type Props = {
  isEditModalOpen?: boolean
  setIsEditModalOpen?: (isEditModalOpen: boolean) => void
}

export const Buttons111 = ({ isEditModalOpen, setIsEditModalOpen }: Props) => {
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
