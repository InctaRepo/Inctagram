import React, { MutableRefObject, useEffect, useRef, useState } from 'react'

import { PostImages } from '@/src/entities/post/postImages/ui/PostImages'
import s from '@/src/entities/post/postMenu/postMenu.module.scss'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { PostDescription } from '@/src/features/posts/createPost/addDescription/postDescription'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { PostDeleteModal } from '@/src/features/posts/editDeletePost/postDeleteModal'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { EditDescriptionModal } from '@/src/features/posts/editDeletePost/postDescription/editDescription'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Images } from '@/src/features/posts/service/postApiTypes'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profileSettings/service'
import { useTranslate } from '@/src/shared/hooks'
import { Typography } from '@/src/shared/ui/typography'
import Dots from 'public/icon/dots.svg'
import Edit from 'public/icon/edit.svg'

type Props = {
  openSureDescriptionModal: boolean
  setIsEditDescriptionModalOpen: (isEditDescriptionModalOpen: boolean) => void
  isEditDescriptionModalOpen: boolean
  isEditModalOpen?: boolean
  setIsEditModalOpen: (isEditModalOpen: boolean) => void
  images?: Images[]
  id?: string | (string[] & string) | undefined
  description?: string
  createdAt?: Date
  userData?: UserInfo
  userName?: string
}

export const PostMenu = ({
  setIsEditDescriptionModalOpen,
  isEditDescriptionModalOpen,
  isEditModalOpen,
  setIsEditModalOpen,
  images,
  id,
  description,
  createdAt,
  userData,
  userName,
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
      <div onClick={() => setIsOpen(!isOpen)} className={s.editBtn}>
        <Dots alt={'dots'} width={24} height={24} className={isOpen ? s.blueDots : s.blue} />
      </div>
      {isOpen && (
        <div className={s.editOptions}>
          <div className={s.editOption1} onClick={editModalHandler}>
            <Edit alt={'edit'} width={24} height={24} />
            <Typography variant={'regular14'}>{t.profile.editPost.edit}</Typography>
          </div>
          <div>
            <PostDeleteModal
              id={id}
              setIsEditModalOpen={setIsEditModalOpen}
              openDeleteModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          </div>
        </div>
      )}
      {isEditDescriptionModalOpen && (
        <div className={s.editOptions}>
          <EditDescriptionModal
            setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
            isEditDescriptionModalOpen={isEditDescriptionModalOpen}
            images={images}
            id={id}
            description={description}
            createdAt={createdAt}
            userName={userName}
            userData={userData}
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
          >
            <div className={s.wrapper}>
              <PostImages images={images} id={id} />
              <PostDescription description={description} />
            </div>
          </EditDescriptionModal>
        </div>
      )}
    </div>
  )
}
