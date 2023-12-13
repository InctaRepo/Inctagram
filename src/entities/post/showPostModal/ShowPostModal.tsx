import React, { ComponentProps, useEffect, useState } from 'react'

import Image from 'next/image'

import { PostImages } from '@/src/entities/post/postImages/ui/PostImages'
import { EditModal } from '@/src/entities/post/showPostModal/editModal/EditModal'
import { RightDescription } from '@/src/entities/post/showPostModal/editModal/rightDescription/RightDescription'
import s from '@/src/entities/post/showPostModal/showPostModal.module.scss'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { GetUserPostResponse } from '@/src/features/posts'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Images } from '@/src/features/posts/service'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profileSettings/service'
import { getIsAuth } from '@/src/shared/hoc'
import { getUsername } from '@/src/shared/hoc/model/selectors/getUsername/getUsername'
import { useAppSelector } from '@/src/shared/hooks'

type Props = {
  openSureDescriptionModal?: boolean
  isDescription?: boolean
  description?: string
  createdAt?: Date
  userData?: UserInfo
  images: Images[]
  id: string
  modalWidth?: string
  callBack?: (id: string | null) => void
  variant?: string
  postId?: string
  postData: GetUserPostResponse
} & ComponentProps<'div'>

export const ShowPostModal = ({
  openSureDescriptionModal,
  description,
  createdAt,
  userData,
  images,
  id,
  postId,
  postData,
  variant,
  isDescription,
  callBack,
}: Props) => {
  const [isEditDescriptionModalOpen, setIsEditDescriptionModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const username = useAppSelector(getUsername)
  const isAuth = useAppSelector(getIsAuth)
  // const { data: post } = useGetUserPostQuery('6ec102f6-8df9-4b71-bd83-f90e16b396d6')
  const userId = userData?.userId
  const currentId = postData ? postId : id
  const currentImages = postData ? postData.images : images
  const buttonClickHandler = () => {
    setIsEditModalOpen(false)
    window.history.pushState(null, 'post by user', `/profile/${userId}`)
  }

  const openClickHandler = () => {
    setIsEditModalOpen(true)
    window.history.pushState(null, 'post by user', `/profile/${userId}/post/${currentId}`)
  }

  useEffect(() => {
    if (variant === 'single post') {
      openClickHandler()
    }
  }, [])

  return (
    <div>
      <Image
        src={currentImages ? images[0].url : ''}
        width={234}
        height={228}
        alt={'post'}
        onClick={openClickHandler}
        priority={true}
      />

      <EditModal
        openSureDescriptionModal={openSureDescriptionModal ? openSureDescriptionModal : false}
        modalWidth={'edit'}
        open={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        onClose={buttonClickHandler}
        isDescription={!isEditDescriptionModalOpen}
      >
        <div className={s.wrapper}>
          <PostImages images={currentImages} />
          <RightDescription
            openSureDescriptionModal={openSureDescriptionModal ? openSureDescriptionModal : false}
            setIsEditDescriptionModalOpen={setIsEditDescriptionModalOpen}
            isEditDescriptionModalOpen={isEditDescriptionModalOpen}
            images={currentImages}
            id={currentId}
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
