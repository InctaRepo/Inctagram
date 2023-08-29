import React, {ChangeEvent, useRef, useState} from 'react';
import {Button} from "@/src/components/ui/button";
import s from './input-type-file.module.scss'

type InputTypeFileProps = {
    setSelectedImage: (image: File) => void
}
export const InputTypeFile = ({setSelectedImage}: InputTypeFileProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const selectFileHandler = () => {
        inputRef && inputRef.current?.click()
    }
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 10000000) {
                setSelectedImage(file)
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }

        }
    }

    return (
        <div>

            <Button variant={"primary"} onClick={selectFileHandler} className={s.btn}>
                Select from Computer
            </Button>
            <input
                style={{display: 'none'}}
                ref={inputRef}
                type="file"
                onChange={uploadHandler}
                accept="image/png, image/jpeg, image/jpg"
            />
        </div>
    );
};

