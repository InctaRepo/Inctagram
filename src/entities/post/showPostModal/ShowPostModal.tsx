import React, { ComponentProps, useCallback, useEffect, useState } from 'react'

import { PostImages } from '@/entities/post/postImages/ui/PostImages'
import { EditModal } from '@/entities/post/showPostModal/editModal'
import { RightDescription } from '@/entities/post/showPostModal/editModal/rightDescription'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetProfileQuery } from '@/entities/profile/service'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Images } from '@/features/posts/service'
import { RouteNames } from '@/shared/const'
import Image from 'next/image'

import s from '@/entities/post/showPostModal/showPostModal.module.scss'

type Props = {
  createdAt?: Date
  description?: string
  id: string
  images: Images[]
  openSureDescriptionModal?: boolean
  postId?: string
  userId: string
} & ComponentProps<'div'>

export const ShowPostModal = ({
  createdAt,
  description,
  id,
  images,
  openSureDescriptionModal,
  postId,
  userId,
}: Props) => {
  const [isEditDescriptionModalOpen, setIsEditDescriptionModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { data: userData } = useGetProfileQuery(userId)
  const currentId = id === undefined ? postId : id

  const buttonClickHandler = () => {
    setIsEditModalOpen(false)
    window.history.pushState(null, 'post', `${RouteNames.PROFILE}/${userId}`)
  }

  const openClickHandler = useCallback(() => {
    setIsEditModalOpen(true)
    window.history.pushState(
      null,
      'post',
      `${RouteNames.PROFILE}/${userId}${RouteNames.POST}/${currentId}`
    )
  }, [currentId, userId])

  useEffect(() => {
    if (id === postId) {
      openClickHandler()
    }
  }, [id, openClickHandler, postId])

  return (
    <div className={s.container}>
      <div className={s.postImage}>
        <Image
          alt={'post'}
          height={640}
          onClick={openClickHandler}
          priority
          src={images[0].url}
          style={{
            height: 'auto',
            width: '100%',
          }}
          width={640}
        />
      </div>

      <EditModal
        isDescription={!isEditDescriptionModalOpen}
        onClose={buttonClickHandler}
        open={isEditModalOpen}
        openSureDescriptionModal={openSureDescriptionModal ? openSureDescriptionModal : false}
        setIsEditModalOpen={setIsEditModalOpen}
      >
        <div className={s.wrapper}>
          <PostImages images={images} />
          <RightDescription
            createdAt={createdAt}
            description={description}
            id={id}
            images={images}
            isEditDescriptionModalOpen={isEditDescriptionModalOpen}
            isEditModalOpen={isEditModalOpen}
            openSureDescriptionModal={openSureDescriptionModal ? openSureDescriptionModal : false}
            setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            userData={userData?.data}
          />
        </div>
      </EditModal>
    </div>
  )
}
