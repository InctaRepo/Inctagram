import React, { ComponentProps, useEffect, useState } from 'react'

import Image from 'next/image'

import { PostImages } from '@/entities/post/postImages/ui/PostImages'
import { EditModal } from '@/entities/post/showPostModal/editModal/EditModal'
import { RightDescription } from '@/entities/post/showPostModal/editModal/rightDescription/RightDescription'
import s from '@/entities/post/showPostModal/showPostModal.module.scss'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetProfileQuery } from '@/entities/profile/service'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Images } from '@/features/posts/service'
import { RouteNames } from '@/shared/const'

type Props = {
  openSureDescriptionModal?: boolean
  description?: string
  createdAt?: Date
  images: Images[]
  id: string
  postId?: string
  userId: string
} & ComponentProps<'div'>

export const ShowPostModal = ({
  openSureDescriptionModal,
  description,
  createdAt,
  images,
  id,
  postId,
  userId,
}: Props) => {
  const [isEditDescriptionModalOpen, setIsEditDescriptionModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { data: userData, isSuccess, isLoading } = useGetProfileQuery(userId)
  const currentId = id === undefined ? postId : id

  const buttonClickHandler = () => {
    setIsEditModalOpen(false)
    window.history.pushState(null, 'post', `${RouteNames.PROFILE}/${userId}`)
  }

  const openClickHandler = () => {
    setIsEditModalOpen(true)
    window.history.pushState(
      null,
      'post',
      `${RouteNames.PROFILE}/${userId}${RouteNames.POST}/${currentId}`
    )
  }

  useEffect(() => {
    if (id === postId) {
      openClickHandler()
    }
  }, [id, postId])

  return (
    <div className={s.container}>
      <div className={s.postImage}>
        <Image
          src={images[0].url}
          width={640}
          height={640}
          alt={'post'}
          onClick={openClickHandler}
          priority={true}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>

      <EditModal
        openSureDescriptionModal={openSureDescriptionModal ? openSureDescriptionModal : false}
        modalWidth={'edit'}
        open={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        onClose={buttonClickHandler}
        isDescription={!isEditDescriptionModalOpen}
      >
        <div className={s.wrapper}>
          <PostImages images={images} />
          <RightDescription
            openSureDescriptionModal={openSureDescriptionModal ? openSureDescriptionModal : false}
            setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
            isEditDescriptionModalOpen={isEditDescriptionModalOpen}
            images={images}
            id={id}
            description={description}
            createdAt={createdAt}
            userData={userData?.data}
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
          />
        </div>
      </EditModal>
    </div>
  )
}
