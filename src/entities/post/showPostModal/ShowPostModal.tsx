import React, { ComponentProps, useEffect, useState } from 'react'

import Image from 'next/image'

import { PostImages } from '@/entities/post/postImages/ui/PostImages'
import { EditModal } from '@/entities/post/showPostModal/editModal/EditModal'
import { RightDescription } from '@/entities/post/showPostModal/editModal/rightDescription/RightDescription'
import s from '@/entities/post/showPostModal/showPostModal.module.scss'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/entities/profile/service'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Images, useGetUserPostQuery } from '@/features/posts/service'
import { RouteNames } from '@/shared/const'
import { getIsAuth, getUsername } from '@/shared/hoc'
import { useAppSelector } from '@/shared/hooks'

type Props = {
  openSureDescriptionModal?: boolean
  description?: string
  createdAt?: Date
  userData?: UserInfo
  images: Images[]
  id: string
  postId?: string
  userId?: string
} & ComponentProps<'div'>

export const ShowPostModal = ({
  openSureDescriptionModal,
  description,
  createdAt,
  userData,
  images,
  id,
  postId,
  userId: propUserId,
}: Props) => {
  const [isEditDescriptionModalOpen, setIsEditDescriptionModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const username = useAppSelector(getUsername)
  const isAuth = useAppSelector(getIsAuth)
  const userId = propUserId || userData?.userId
  const { data: postData } = useGetUserPostQuery(postId!)
  const currentId = postData ? postId : id

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
  }, [])

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
            userName={userData?.username}
            userData={userData}
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
          />
        </div>
      </EditModal>
    </div>
  )
}
