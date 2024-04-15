import React, { MutableRefObject, useEffect, useRef, useState } from 'react'

import { AddedImages } from '@/features/posts/createPost/editPhoto/add/addedImages/AddedImages'
import AddImage from '@/public/icon/image.svg'
import PlusCircleOutline from '@/public/icon/plusCircleOutlineIcon.svg'
import { Image } from '@/shared/types'

import s from '@/features/posts/createPost/editPhoto/add/Add.module.scss'

type Props = {
  addedImages: Image[]
  setAddedImages: (addedImages: Image[]) => void
}

export const Add = ({ addedImages, setAddedImages }: Props) => {
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

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const handleImageUpload = async (e: any) => {
    setAddedImages([
      ...addedImages,
      {
        activeFilter: 'none',
        fileName: e.target.files[0].name,
        image: URL.createObjectURL(e.target.files[0]),
      },
    ])
  }

  return (
    <div className={s.wrapper} ref={addRef}>
      <div className={s.addBtn}>
        <AddImage
          alt={'add image'}
          className={isAddOpen ? s.blueActive : s.blue}
          height={24}
          onClick={() => setIsAddOpen(current => !current)}
          width={24}
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
                accept={'image/png, image/jpeg, image/jpg'}
                name={'cover'}
                onChange={handleImageUpload}
                ref={inputRef}
                style={{ display: 'none' }}
                type={'file'}
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
