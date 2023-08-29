// import {Typography} from "@storybook/theming";
import React from 'react'
import s from "./style.module.scss"
import {Typography} from "../../../ui/typography";
import {Header} from "../../../ui/Header";
// Import your Typography component

const Terms = () => {
    return (
        <div className={s.main}>
            {/*<Typography>Terms of Service</Typography>*/}
            <Header/>
            <Typography as="h2" variant="h2" color="primary">
                Terms of Service
            </Typography>

            <blockquote> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, aspernatur autem cupiditate
                debitis dignissimos, explicabo fugit ipsum, magnam
                nesciunt odio optio quidem quis rem voluptas voluptatem.
                Earum quasi recusandae tenetur?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, aspernatur autem cupiditate debitis
                dignissimos, explicabo fugit ipsum, magnam
                nesciunt odio optio quidem quis rem voluptas voluptatem.
                Earum quasi recusandae tenetur?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, aspernatur autem cupiditate debitis
                dignissimos, explicabo fugit ipsum, magnam
                nesciunt odio optio quidem quis rem voluptas voluptatem.
                Earum quasi recusandae tenetur?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam,
                aspernatur autem cupiditate debitis dignissimos, explicabo fugit ipsum, magnam
                nesciunt odio optio quidem quis rem voluptas voluptatem.
                Earum quasi recusandae tenetur?

            </blockquote>
        </div>
    )
}

export default Terms
