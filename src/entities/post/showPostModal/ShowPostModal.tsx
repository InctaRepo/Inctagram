import React, { ComponentProps, useEffect, useState } from 'react'

import Image from 'next/image'
import Slider from 'react-slick'

import { PostImages } from '@/src/entities/post/postImages/ui/PostImages'
import { EditModal } from '@/src/entities/post/showPostModal/editModal/EditModal'
import { RightDescription } from '@/src/entities/post/showPostModal/editModal/rightDescription/RightDescription'
import s from '@/src/entities/post/showPostModal/showPostModal.module.scss'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SliderSettings } from '@/src/entities/post/sliderSettings'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { GetUserPostResponse, useGetUserPostQuery } from '@/src/features/posts'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Images } from '@/src/features/posts/service'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profileSettings/service'
import { getIsAuth } from '@/src/shared/hoc'
import { getUsername } from '@/src/shared/hoc/model/selectors/getUsername/getUsername'
import { useAppSelector } from '@/src/shared/hooks'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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
  posts?: GetUserPostResponse[]
} & ComponentProps<'div'>

export const ShowPostModal = ({
  posts,
  openSureDescriptionModal,
  description,
  createdAt,
  userData,
  images,
  id,
  postId,
  variant,
  isDescription,
  callBack,
}: Props) => {
  const [isEditDescriptionModalOpen, setIsEditDescriptionModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const username = useAppSelector(getUsername)
  const isAuth = useAppSelector(getIsAuth)
  const { data: postData } = useGetUserPostQuery(postId!)
  const userId = userData?.userId
  const currentId = postData ? postId : id

  const settings = {
    dots: true,
    swipe: false,
    arrows: true,
    dotsClass: `slick-dots ${s.dots}`,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props

    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          right: 15,
          backgroundColor: '#4c4c4c',
          borderRadius: 50,
        }}
        onClick={onClick}
      />
    )
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props

    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          left: 15,
          zIndex: 1,
          backgroundColor: '#4c4c4c',
          borderRadius: 50,
        }}
        onClick={onClick}
      />
    )
  }

  const buttonClickHandler = () => {
    setIsEditModalOpen(false)
    window.history.pushState(null, 'post', `/profile/${userId}`)
  }

  const openClickHandler = () => {
    setIsEditModalOpen(true)
    window.history.pushState(null, 'post', `/profile/${userId}/post/${id}`)
  }

  useEffect(() => {
    if (variant === 'single post') {
      openClickHandler()
    }
  }, [])

  return (
    <div>
      <Image
        src={images[0].url}
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
