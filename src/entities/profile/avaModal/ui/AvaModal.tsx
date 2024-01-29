import React, { useState } from 'react'

import * as Slider from '@radix-ui/react-slider'
import Image from 'next/image'
import AvatarEditor from 'react-avatar-editor'

import s from '@/entities/profile/avaModal/ui/avaModal.module.scss'
import { useDeleteAvatarMutation } from '@/entities/profile/service'
import DeleteIcon from '@/public/icon/deleteAvaIcon.svg'
import ImgOutline from '@/public/icon/imgOutlineIcon.svg'
import DefaultAva from '@/public/images/avatarIcon.jpg'
import { useTranslate } from '@/shared/hooks'
import { Button } from '@/ui/button'
import { InputTypeFile } from '@/ui/inputTypeFile'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

type Props = {
  avatar: string
  setAvatar?: (avatar: string | null) => void
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  selectedImage: File | null
  setSelectedImage: (selectedImage: File | null) => void
  editorRef: React.RefObject<AvatarEditor>
  handleSavePhoto: () => void
  croppedAvatar: string | null
  setCroppedAvatar: (croppedAvatar: string | null) => void
}

export const AvaModal = ({
  avatar,
  croppedAvatar,
  setCroppedAvatar,
  isModalOpen,
  setIsModalOpen,
  selectedImage,
  setSelectedImage,
  editorRef,
  handleSavePhoto,
}: Props) => {
  const { t } = useTranslate()
  const [slideValue, setSlideValue] = useState<number>(10)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 })
  const [errorMessage, setErrorMessage] = useState('')
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const showError = !!errorMessage && errorMessage.length > 0
  const [deleteAvatar] = useDeleteAvatarMutation()
  const [isAvaBroken, setIsAvaBroken] = useState(false)
  const handlePositionChange = (position: { x: number; y: number }) => {
    setPosition(position)
  }
  const handleButtonClick = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    setErrorMessage('')
  }

  const isError =
    errorMessage?.includes('Error! Photo size must be less than 10 MB') ||
    errorMessage?.includes('Ошибка! Размер фото не должен превышать 10 MB') ||
    errorMessage?.includes('Error! The format of the uploaded photo must be PNG or JPEG') ||
    errorMessage?.includes('Ошибка! Формат загружаемой фотографии должен быть PNG или JPEG')

  const handleSliderChange = (value: number | number[]) => {
    setSlideValue(value as number)
  }

  const onModalClose = () => {
    setOpenDeleteModal(false)
  }

  const discardHandler = () => {
    if (setCroppedAvatar) {
      setCroppedAvatar(null)
    }
    deleteAvatar()
      .unwrap()
      .then(() => {
        setOpenDeleteModal(false)
      })
  }
  const errorHandler = () => {
    setIsAvaBroken(true)
  }
  const avaWithError = isAvaBroken ? DefaultAva : avatar

  return (
    <div className={s.container}>
      {croppedAvatar && avatar !== null && (
        <>
          <Image
            width={196}
            height={196}
            src={croppedAvatar ? croppedAvatar : avaWithError}
            alt="ava"
            className={s.ava}
            onError={errorHandler}
          />
          <div onClick={() => setOpenDeleteModal(true)}>
            <DeleteIcon className={s.deleteAvatarIcon} />
          </div>
          <Modal
            modalWidth={'sm'}
            open={openDeleteModal}
            onClose={onModalClose}
            title={t.profileSetting.generalInformation.deletePhoto}
            cancelButtonName={t.profileSetting.generalInformation.no}
            actionButtonName={t.profileSetting.generalInformation.yes}
            onCancel={onModalClose}
            onAction={discardHandler}
          >
            <Typography variant={'h3'}>{t.profileSetting.generalInformation.areYouSure}</Typography>
          </Modal>
        </>
      )}
      {croppedAvatar && !avatar && (
        <>
          <Image
            width={196}
            height={196}
            src={croppedAvatar ? croppedAvatar : avaWithError}
            alt="ava"
            className={s.ava}
            onError={errorHandler}
          />
          <div onClick={() => setOpenDeleteModal(true)}>
            <DeleteIcon className={s.deleteAvatarIcon} />
          </div>
          <Modal
            modalWidth={'sm'}
            open={openDeleteModal}
            onClose={onModalClose}
            title={t.profileSetting.generalInformation.deletePhoto}
            cancelButtonName={t.profileSetting.generalInformation.no}
            actionButtonName={t.profileSetting.generalInformation.yes}
            onCancel={onModalClose}
            onAction={discardHandler}
          >
            <Typography variant={'h3'}>{t.profileSetting.generalInformation.areYouSure}</Typography>
          </Modal>
        </>
      )}
      {!croppedAvatar && avatar! && (
        <>
          <Image
            width={196}
            height={196}
            src={croppedAvatar ? croppedAvatar : avaWithError}
            alt="ava"
            className={s.ava}
            onError={errorHandler}
          />
          <div onClick={() => setOpenDeleteModal(true)}>
            <DeleteIcon className={s.deleteAvatarIcon} />
          </div>
          <Modal
            modalWidth={'sm'}
            open={openDeleteModal}
            onClose={onModalClose}
            title={t.profileSetting.generalInformation.deletePhoto}
            cancelButtonName={t.profileSetting.generalInformation.no}
            actionButtonName={t.profileSetting.generalInformation.yes}
            onCancel={onModalClose}
            onAction={discardHandler}
          >
            <Typography variant={'h3'}>{t.profileSetting.generalInformation.areYouSure}</Typography>
          </Modal>
        </>
      )}
      {!croppedAvatar && (avatar === null || !avatar) && (
        <div className={s.photo}>
          <div className={s.ellipse}></div>
          <div className={s.image}>
            <ImgOutline />
          </div>
        </div>
      )}
      <Button variant="outlined" className={s.photoBtn} onClick={() => setIsModalOpen(true)}>
        <Typography variant={'h3'} className={s.addBtn}>
          {t.profileSetting.generalInformation.addAProfilePhoto}
        </Typography>
      </Button>
      <Modal
        className={s.baseModal}
        modalWidth={'md'}
        open={isModalOpen}
        onClose={handleButtonClick}
        title={t.profileSetting.generalInformation.addAProfilePhoto}
      >
        <div className={s.errorContainer}>
          {showError && (
            <div className={s.error}>
              <Typography color="primary" variant="small">
                {errorMessage}
              </Typography>
            </div>
          )}
        </div>
        <div
          className={`${s.photoContainer} ${selectedImage === null ? s.emptyPhotoContainer : ''} ${
            showError ? s.errorPhotoContainer : ''
          }`}
        >
          {selectedImage ? (
            <>
              <AvatarEditor
                ref={editorRef}
                image={selectedImage}
                width={282}
                height={290}
                color={[23, 23, 23, 0.6]}
                backgroundColor={'black'}
                scale={slideValue / 10}
                borderRadius={155}
                position={position}
                onPositionChange={handlePositionChange}
                crossOrigin="anonymous"
                disableBoundaryChecks={false}
              />
              <form>
                <Slider.Root
                  className={s.SliderRoot}
                  defaultValue={[slideValue]}
                  min={10}
                  max={50}
                  step={2}
                  onValueChange={handleSliderChange}
                  value={[slideValue]}
                >
                  <Slider.Track className={s.SliderTrack}>
                    <Slider.Range className={s.SliderRange} />
                  </Slider.Track>
                  <Slider.Thumb className={s.SliderThumb} aria-label="Volume" />
                </Slider.Root>
              </form>
            </>
          ) : (
            <ImgOutline />
          )}
        </div>

        <div className={`${s.btnContainer} ${selectedImage === null ? s.selectPhoto : s.save}`}>
          {selectedImage ? (
            <Button className={s.saveBtn} onClick={handleSavePhoto}>
              {t.profileSetting.generalInformation.save}
            </Button>
          ) : (
            <InputTypeFile setSelectedImage={setSelectedImage} setErrorMessage={setErrorMessage} />
          )}
        </div>
      </Modal>
    </div>
  )
}
