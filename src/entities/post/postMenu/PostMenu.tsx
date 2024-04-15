import React, { MutableRefObject, useEffect, useRef, useState } from 'react'

import { PostImages } from '@/entities/post/postImages/ui/PostImages'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/entities/profile/service'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { PostDescription } from '@/features/posts/createPost/addDescription/postDescription'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { PostDeleteModal } from '@/features/posts/editDeletePost/postDeleteModal'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { EditDescriptionModal } from '@/features/posts/editDeletePost/postDescription/editDescription'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Images } from '@/features/posts/service/postApiTypes'
import { useTranslate } from '@/shared/hooks'
import { Typography } from '@/ui/typography'
import Dots from 'public/icon/dots.svg'
import Edit from 'public/icon/edit.svg'

import s from '@/entities/post/postMenu/postMenu.module.scss'

type Props = {
  createdAt?: Date
  description?: string
  id: string
  images?: Images[]
  isEditDescriptionModalOpen: boolean
  isEditModalOpen?: boolean
  openSureDescriptionModal: boolean
  setIsEditDescriptionModalOpen: (isEditDescriptionModalOpen: boolean) => void
  setIsEditModalOpen: (isEditModalOpen: boolean) => void
  userData?: UserInfo
}

export const PostMenu = ({
  createdAt,
  description,
  id,
  images,
  isEditDescriptionModalOpen,
  isEditModalOpen,
  setIsEditDescriptionModalOpen,
  setIsEditModalOpen,
  userData,
}: Props) => {
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

  const editModalHandler = () => {
    setIsEditDescriptionModalOpen(true)
  }

  return (
    <div ref={editRef}>
      <div className={s.editBtn} onClick={() => setIsOpen(!isOpen)}>
        <Dots alt={'dots'} className={isOpen ? s.blueDots : s.blue} height={24} width={24} />
      </div>
      {isOpen && (
        <div className={s.editOptions}>
          <div className={s.editOption1} onClick={editModalHandler}>
            <Edit alt={'edit'} height={24} width={24} />
            <Typography variant={'regular14'}>{t.posts.editPost.edit}</Typography>
          </div>
          <div>
            <PostDeleteModal
              id={id}
              openDeleteModal={openDeleteModal}
              setIsEditModalOpen={setIsEditModalOpen}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          </div>
        </div>
      )}
      {isEditDescriptionModalOpen && (
        <div className={s.editOptions}>
          <EditDescriptionModal
            createdAt={createdAt}
            description={description}
            id={id}
            images={images}
            isEditDescriptionModalOpen={isEditDescriptionModalOpen}
            isEditModalOpen={isEditModalOpen}
            setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            userData={userData}
          >
            <div className={s.wrapper}>
              <PostImages images={images} />
              <PostDescription description={description} />
            </div>
          </EditDescriptionModal>
        </div>
      )}
    </div>
  )
}
