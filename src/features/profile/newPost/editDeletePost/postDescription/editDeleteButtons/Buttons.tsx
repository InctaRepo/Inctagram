import Image from 'next/image'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import dots from '@/src/assets/icons/dots.svg'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative,@conarti/feature-sliced/layers-slices
import { Images } from '@/src/features/posts/postApiTypes'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { PostImages } from '@/src/features/profile/newPost/editDeletePost/postImages/PostImages'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { UserInfo } from '@/src/features/profile/service/profileApiTypes'
import { useTranslate } from '@/src/shared/hooks'
import { PostDescription } from '../../../createPost/addDescription/postDescription/PostDescription'
import { DeleteModal } from '../../smallModals/DeleteModal'
import s from '../editDeleteButtons/Buttons.module.scss'
import { EditDescriptionModal } from '../editDescription/EditDescriptionModal'

type Props = {
  isEditModalOpen?: boolean
  setIsEditModalOpen: (isEditModalOpen: boolean) => void
  images: Images[]
  id: string
  description?: string
  createdAt: Date
  userData: UserInfo
  userName: string
}

export const Buttons = ({
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

  return (
    <div ref={editRef}>
      <div onClick={() => setIsOpen(true)} className={s.editBtn}>
        <Image src={dots} alt={'dots'} width={24} height={24} className={s.blue} />
      </div>
      {isOpen && (
        <div className={s.editOptions}>
          <EditDescriptionModal
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

          <div>
            <DeleteModal
              id={id}
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
