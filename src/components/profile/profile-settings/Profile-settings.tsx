import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import s from './profileSettings.module.scss'
import {ControlledTextField} from "@/src/components/ui/controlled"
import {Card} from "@/src/components/ui/card-temporary"
import Link from "next/link"
import { Button } from '@/src/components/ui/button'
import {ImgOutline} from '@/src/assets/icons/image-outline'
import CalendarOutline from '@/src/assets/icons/calendar-outline'
import {Typography} from "@/src/components/ui/typography"
import { useTranslation } from '@/src/assets/hooks/useTranslation'
import {profileSettingSchema} from "@/src/common/schemas/profile-setting-schema";
import {TextAreaField} from "@/src/components/ui/text-area";


export type ProfileSettingType = z.infer<typeof profileSettingSchema>

type ProfileSettingPropsType = {
    onSubmitHandler: (data: ProfileSettingType) => void
}

export const ProfileSettings = (props: ProfileSettingPropsType) => {
    const { onSubmitHandler } = props
    const { t } = useTranslation()

    const { control, handleSubmit } = useForm<ProfileSettingType>({
        resolver: zodResolver(profileSettingSchema),
        mode: 'onChange',
    })

    const onSubmit = handleSubmit((data: ProfileSettingType) => {
        onSubmitHandler(data)
    })

    return (
        <div className={s.profile}>
            <div className={s.content}>
                    <nav>
                        <ul className={s.navMenu}>
                            <li>
                                <Link className={s.link} href={'/'}>
                                    <Typography variant={'h3'} color='secondary'>
                                        General information
                                    </Typography>
                                    </Link>
                            </li>
                            <li>
                                <Link className={s.link} href={'/devices'} >
                                    <Typography variant={'h3'} color='secondary'>
                                    Devices
                                    </Typography>
                                </Link>
                            </li>
                            <li>
                                <Link className={s.link} href={'/account-management'}>
                                    <Typography variant={'h3'} color='secondary'>
                                    Account Management
                                </Typography>
                                </Link>
                            </li>
                            <li>
                                <Link className={s.link} href={'/my-payment'}>
                                    <Typography variant={'h3'} color='secondary'>
                                    My payments
                                    </Typography>
                                    </Link>
                            </li>
                        </ul>
                    </nav>

                <div className={s.userInfo}>
<div>
                        <div className={s.ellipse}>

                        </div>
    <ImgOutline className={s.image}/>
                        <Button  className={s.addBtn}>
                            <Typography variant={'h3'}>Add a Profile Photo</Typography>
                        </Button>

</div>
                    <div>
                    <form className={s.editForm}>
                        <ControlledTextField
                            control={control}
                            name={'username'}
                            label="UserName"
                            className={s.field}
                        />
                        <ControlledTextField
                            control={control}
                            name={'firstName'}
                            label="First name"
                            className={s.field}
                        />
                        <ControlledTextField
                             control={control}
                            name={'lastName'}
                            label="Last name"
                            className={s.field}
                        />
                        <ControlledTextField
                             control={control}
                            name={'dateOfBirthday'}
                            label="Date of birthday"
                            className={s.field}
                             />
                            <CalendarOutline/>

                        <ControlledTextField
                             control={control}
                            name={'city'}
                            label="City"
                            className={s.field}
                        />
                        <TextAreaField className={s.textArea} fullWidth={true}
                            label="About me"/>

                    </form>
                    </div>
                </div>
                <div>
                <Button variant="primary" className={s.saveBtn}>
                    <Typography variant={'h3'} color='secondary'>Save Changes</Typography>
                    </Button>
                </div>
            </div>
        </div>
    )
}