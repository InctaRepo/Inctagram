import ImageToAdd from 'next/image'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import AddPhoto from '@/src/assets/icons/image-ouline.svg'
import { PlusCircleOutline } from '@/src/assets/icons/plus-circle-outline'
import { Image } from '../../CreateNewPost'
import { AddedImages } from '../../editPhoto/add/addedImages/AddedImages'
import s from '../add/Add.module.scss'

type Props = {
  addedImages: Image[]
  setAddedImages: (addedImages: Image[]) => void
  image?: string
  croppedImage?: string
}

export const Add = ({ image, addedImages, setAddedImages, croppedImage }: Props) => {
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
    setAddedImages([...addedImages, { image: URL.createObjectURL(e.target.files[0]) }])
  }

  return (
    <div ref={addRef} className={s.wrapper}>
      <div className={s.addBtn}>
        <AddPhoto
          alt={'add photo'}
          onClick={() => setIsAddOpen(current => !current)}
          width={24}
          height={24}
          className={isAddOpen ? s.blueActive : s.blue}
        />
      </div>
      {isAddOpen && (
        <div className={s.addContainer}>
          {addedImages.length && (
            <AddedImages
              croppedImage={croppedImage}
              addedImages={addedImages}
              setAddedImages={setAddedImages}
              image={image}
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
