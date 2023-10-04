import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Area, Point } from 'react-easy-crop'

import s from './create-new-post.module.scss'

import { useTranslate } from '@/src/assets/hooks/use-translate'
import { ImgOutline } from '@/src/assets/icons/image-outline'
// eslint-disable-next-line import/namespace,import/default
import CroppedImage from '@/src/components/profile/new-post/cropped-image/cropped-image'
import { CropArgType } from '@/src/components/profile/new-post/cropped-image/easy-crop'
import { Demo } from '@/src/components/profile/new-post/cropped-image/test-component'
import CropModal from '@/src/components/profile/new-post/modal-for-crop/crop-modal'
import { Button } from '@/src/components/ui/button'
import BaseModal from '@/src/components/ui/modals/BaseModal/BaseModal'
import { Typography } from '@/src/components/ui/typography'

export type SettingPhotoModalType = {
  // isModalOpen: boolean
  // setIsModalOpen: () => void
}
/*type addProps = {
  addedImages: ImageType[]
  setAddedImages: Dispatch<SetStateAction<ImageType[]>>
  image: string
}
type ImageType = [{ id: string; image: string }]*/

export type ImageType = {
  image: string
  id?: string
  //croppedImage?: string
  /*url?: string
  cropData?: {
    crop: { x: number; y: number }
    croppedAreaPixels: CropArgType
    aspect: number
    zoom: number
  }*/
}

export const CreatePostModal = (props: SettingPhotoModalType) => {
  const { t } = useTranslate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [image, setImage] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspectRatio, setAspectRatio] = useState(4 / 3)
  const [addedImages, setAddedImages] = useState<ImageType[]>([])

  const handleButtonClick = () => {
    setIsBaseModalOpen(false)
    setImage(null)
  }
  const cancelButtonClick = () => {
    setImage(null)
  }

  const handleImageUpload = async (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]))
    setAddedImages([
      {
        id: (addedImages.length + 1).toString(),
        image: URL.createObjectURL(e.target.files[0]),
      },
    ])
  }
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  return (
    <div className={s.container}>
      {!image && isBaseModalOpen ? (
        <BaseModal
          modalWidth={'md'}
          open={isBaseModalOpen}
          onClose={handleButtonClick}
          title={t.profile.addPostPhoto}
        >
          <div className={`${s.photoContainer} ${image === null ? s.emptyPhotoContainer : ''}`}>
            <ImgOutline />
          </div>
          <div>
            <Button variant={'primary'} onClick={selectFileHandler} className={s.btn}>
              <Typography variant={'h3'}>{t.profile.selectFromComputer}</Typography>
            </Button>
            <input
              type="file"
              ref={inputRef}
              name="cover"
              onChange={handleImageUpload}
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: 'none' }}
            />
          </div>
        </BaseModal>
      ) : (
        <CropModal
          image={image}
          open={isModalOpen}
          onClose={handleButtonClick}
          onCancel={cancelButtonClick}
          title={t.profile.addNewPost.cropping}
          addedImages={addedImages}
          setAddedImages={setAddedImages}
          isBaseModalOpen={isBaseModalOpen}
          setIsBaseModalOpen={setIsBaseModalOpen}
          setImage={setImage}
        >
          <CroppedImage
            image={image}
            setImage={setImage}
            addedImages={addedImages}
            setAddedImages={setAddedImages}
          />
        </CropModal>
      )}
    </div>
  )
}
