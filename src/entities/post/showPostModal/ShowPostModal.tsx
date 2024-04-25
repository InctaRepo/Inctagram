import React, { ComponentProps, useCallback, useEffect, useMemo, useState } from 'react'

import { PostImages } from '@/entities/post/postImages/ui/PostImages'
import { EditModal } from '@/entities/post/showPostModal/editModal'
import { RightDescription } from '@/entities/post/showPostModal/editModal/rightDescription'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetProfileQuery } from '@/entities/profile/service'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { GetUserPostResponse, Items } from '@/features/posts'
import { RouteNames } from '@/shared/const'
import Image from 'next/image'

import s from '@/entities/post/showPostModal/showPostModal.module.scss'

type Props = {
  currentPostId?: string
  data: GetUserPostResponse | Items
  description?: string
  openSureDescriptionModal?: boolean
} & ComponentProps<'div'>

export const ShowPostModal = ({
  currentPostId,
  data: { createdAt, description, id, images, userId },
  openSureDescriptionModal,
}: Props) => {
  const [isEditDescriptionModalOpen, setIsEditDescriptionModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { data: userData } = useGetProfileQuery(userId)
  const currentId = id === undefined ? currentPostId : id
  const memoUserData = useMemo(() => {
    return userData?.data
  }, [userData?.data])
  const buttonClickHandler = useCallback(() => {
    setIsEditModalOpen(false)
    window.history.pushState(null, 'post', `${RouteNames.PROFILE}/${userId}`)
  }, [userId])

  const openClickHandler = useCallback(() => {
    setIsEditModalOpen(true)
    window.history.pushState(
      null,
      'post',
      `${RouteNames.PROFILE}/${userId}${RouteNames.POST}/${currentId}`
    )
  }, [currentId, userId])

  useEffect(() => {
    if (id === currentPostId) {
      openClickHandler()
    }
  }, [id, openClickHandler, currentPostId])

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
            userData={memoUserData}
          />
        </div>
      </EditModal>
    </div>
  )
}
