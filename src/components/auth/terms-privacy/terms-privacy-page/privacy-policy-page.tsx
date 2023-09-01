
import React from 'react'
import s from "./style.module.scss"
// import {Typography} from "../../../ui/typography";
import {Header} from "../../../ui/Header";
import {Typography} from "../../../ui/typography";

const Privacy = () => {


    return (

        <div className={s.main}>
            <Header/>

            <Typography>Privacy Policy</Typography>
            {/*<Typography as="h2" variant="h2" color="primary">*/}
            {/*    Privacy Policy*/}
            {/*</Typography>*/}
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


export default Privacy

