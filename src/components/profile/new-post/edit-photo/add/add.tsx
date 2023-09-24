import React, {
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from 'react'

import { add } from 'husky'
import Image from 'next/image'

import s from './add.module.scss'

import img from '@/src/assets/icons/image-ouline.svg'
import { PlusCircleOutline } from '@/src/assets/icons/plus-circle-outline'
import { AddedImages } from '@/src/components/profile/new-post/edit-photo/add/added-images/added-images'

type addProps = {
  addedImages: ImageType[]
  setAddedImages: Dispatch<SetStateAction<ImageType[]>>
  image: string
}
type ImageType = [{ id: string; image: string }]

export const Add = ({ image, addedImages, setAddedImages }) => {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const addRef = useRef() as MutableRefObject<HTMLDivElement>
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (addRef.current && !e.composedPath().includes(addRef.current)) {
        setIsAddOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    setAddedImages(addedImages)
  }, [addedImages])

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const handleImageUpload = async (e: any) => {
    console.log(addedImages)
    setAddedImages([
      ...addedImages,
      { id: (addedImages.length + 1).toString(), image: URL.createObjectURL(e.target.files[0]) },
    ])
  }

  console.log(addedImages)

  return (
    <div ref={addRef} className={s.wrapper}>
      <div className={s.addBtn}>
        <Image
          src={img}
          alt={'add photo'}
          onClick={() => setIsAddOpen(true)}
          width={24}
          height={24}
          className={s.blue}
        />
      </div>
      {isAddOpen && (
        <div className={s.addContainer}>
          {addedImages.length && (
            <AddedImages
              addedImages={addedImages}
              setAddedImages={setAddedImages}
              className={s.carouselPhoto}
            />
          )}
          {addedImages.length < 10 ? (
            <div
              className={addedImages.length === 1 ? s.addTheSecondPhoto : s.addPhotoBtn}
              onClick={selectFileHandler}
            >
              <PlusCircleOutline />
              <input
                type="file"
                ref={inputRef}
                name="cover"
                onChange={handleImageUpload}
                accept="image/png, image/jpeg, image/jpg"
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  )
}
