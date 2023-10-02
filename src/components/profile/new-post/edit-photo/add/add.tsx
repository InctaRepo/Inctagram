import React, {
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  FC,
} from 'react'

import { add } from 'husky'
import Image from 'next/image'

import s from './add.module.scss'

import img from '@/src/assets/icons/image-ouline.svg'
import { PlusCircleOutline } from '@/src/assets/icons/plus-circle-outline'
import { ImageType } from '@/src/components/profile/new-post/create-new-post'
import { AddedImages } from '@/src/components/profile/new-post/edit-photo/add/added-images/added-images'

type PropsType = {
  addedImages: ImageType[]
  setAddedImages: (addedImages: ImageType[]) => void
  image: string | null
}

export const Add: FC<PropsType> = ({ image, addedImages, setAddedImages }) => {
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
    setAddedImages([...addedImages, { image: URL.createObjectURL(e.target.files[0]) }])
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
            <AddedImages addedImages={addedImages} setAddedImages={setAddedImages} />
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
