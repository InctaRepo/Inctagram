import React, { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { useDeleteAvatarMutation } from '@/entities/profile/service'
import DeleteIcon from '@/public/icon/deleteAvaIcon.svg'
import ImgOutline from '@/public/icon/imgOutlineIcon.svg'
import DefaultAva from '@/public/images/avatarIcon.jpg'
import { convertFileToBase64 } from '@/shared/helpers/convertFileToBase64'
import { useTranslate } from '@/shared/hooks'
import { Button } from '@/ui/button'
import { InputTypeFile } from '@/ui/inputTypeFile'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'
import * as Slider from '@radix-ui/react-slider'
import Image from 'next/image'

import s from '@/entities/profile/avaModal/ui/avaModal.module.scss'

type Props = {
  avatar: string
  setAvatar?: (avatar: FormData | null) => void
}

export const AvaModal = ({ avatar, setAvatar }: Props) => {
  const { t } = useTranslate()
  const editorRef = useRef<AvatarEditor>(null)
  const [slideValue, setSlideValue] = useState<number>(10)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 })
  const [errorMessage, setErrorMessage] = useState('')
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const showError = !!errorMessage && errorMessage.length > 0
  const [deleteAvatar] = useDeleteAvatarMutation()
  const [isAvaBroken, setIsAvaBroken] = useState(false)
  const [croppedAvatar, setCroppedAvatar] = useState<null | string>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const handlePositionChange = (position: { x: number; y: number }) => {
    setPosition(position)
  }
  const handleButtonClick = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    setErrorMessage('')
  }
  const handleSavePhoto = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas()

      canvas.toBlob(blob => {
        if (blob) {
          const file = new File([blob], 'avatar', { type: blob.type })
          const formData = new FormData()

          formData.append('file', file)
          convertFileToBase64(file, (file64: string) => {
            setCroppedAvatar(file64)
          })
          if (setAvatar) {
            setAvatar(formData)
          }
          setIsModalOpen(false)
          setSelectedImage(null)
        }
      })
    }
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
            alt={'ava'}
            className={s.ava}
            height={196}
            onError={errorHandler}
            src={croppedAvatar ? croppedAvatar : avaWithError}
            width={196}
          />
          <div onClick={() => setOpenDeleteModal(true)}>
            <DeleteIcon className={s.deleteAvatarIcon} />
          </div>
          <Modal
            actionButtonName={t.profileSetting.generalInformation.yes}
            cancelButtonName={t.profileSetting.generalInformation.no}
            modalWidth={'sm'}
            onAction={discardHandler}
            onCancel={onModalClose}
            onClose={onModalClose}
            open={openDeleteModal}
            title={t.profileSetting.generalInformation.deletePhoto}
          >
            <Typography variant={'h3'}>{t.profileSetting.generalInformation.areYouSure}</Typography>
          </Modal>
        </>
      )}
      {croppedAvatar && !avatar && (
        <>
          <Image
            alt={'ava'}
            className={s.ava}
            height={196}
            onError={errorHandler}
            src={croppedAvatar ? croppedAvatar : avaWithError}
            width={196}
          />
          <div onClick={() => setOpenDeleteModal(true)}>
            <DeleteIcon className={s.deleteAvatarIcon} />
          </div>
          <Modal
            actionButtonName={t.profileSetting.generalInformation.yes}
            cancelButtonName={t.profileSetting.generalInformation.no}
            modalWidth={'sm'}
            onAction={discardHandler}
            onCancel={onModalClose}
            onClose={onModalClose}
            open={openDeleteModal}
            title={t.profileSetting.generalInformation.deletePhoto}
          >
            <Typography variant={'h3'}>{t.profileSetting.generalInformation.areYouSure}</Typography>
          </Modal>
        </>
      )}
      {!croppedAvatar && avatar! && (
        <>
          <Image
            alt={'ava'}
            className={s.ava}
            height={196}
            onError={errorHandler}
            src={croppedAvatar ? croppedAvatar : avaWithError}
            width={196}
          />
          <div onClick={() => setOpenDeleteModal(true)}>
            <DeleteIcon className={s.deleteAvatarIcon} />
          </div>
          <Modal
            actionButtonName={t.profileSetting.generalInformation.yes}
            cancelButtonName={t.profileSetting.generalInformation.no}
            modalWidth={'sm'}
            onAction={discardHandler}
            onCancel={onModalClose}
            onClose={onModalClose}
            open={openDeleteModal}
            title={t.profileSetting.generalInformation.deletePhoto}
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
      <Button className={s.photoBtn} onClick={() => setIsModalOpen(true)} variant={'outlined'}>
        <Typography className={s.addBtn} variant={'h3'}>
          {t.profileSetting.generalInformation.addAProfilePhoto}
        </Typography>
      </Button>
      <Modal
        className={s.baseModal}
        modalWidth={'md'}
        onClose={handleButtonClick}
        open={isModalOpen}
        title={t.profileSetting.generalInformation.addAProfilePhoto}
      >
        <div className={s.errorContainer}>
          {showError && (
            <div className={s.error}>
              <Typography color={'primary'} variant={'small'}>
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
                backgroundColor={'black'}
                borderRadius={155}
                color={[23, 23, 23, 0.6]}
                crossOrigin={'anonymous'}
                disableBoundaryChecks={false}
                height={290}
                image={selectedImage}
                onPositionChange={handlePositionChange}
                position={position}
                ref={editorRef}
                scale={slideValue / 10}
                width={282}
              />
              <form>
                <Slider.Root
                  className={s.SliderRoot}
                  defaultValue={[slideValue]}
                  max={50}
                  min={10}
                  onValueChange={handleSliderChange}
                  step={2}
                  value={[slideValue]}
                >
                  <Slider.Track className={s.SliderTrack}>
                    <Slider.Range className={s.SliderRange} />
                  </Slider.Track>
                  <Slider.Thumb aria-label={'Volume'} className={s.SliderThumb} />
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
            <InputTypeFile setErrorMessage={setErrorMessage} setSelectedImage={setSelectedImage} />
          )}
        </div>
      </Modal>
    </div>
  )
}
