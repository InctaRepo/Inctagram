import React, {useState} from "react";
import "./recaptcha.scss";
import Image from "next/image";
import Privacy from "./assets/recaptcha.svg";
import Checked from "./assets/recaptchaChecked.svg";

interface FormProps {
    primary?: boolean
}

export const Recaptcha = ({
                              primary = true,
                          }: FormProps) => {
    const mode = primary ? 'storybook-recaptcha--primary' : 'storybook-recaptcha--secondary';

    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const onClick = () => {
        setIsLoading(!isLoading);
        setTimeout(() => {
            setIsLoading(!isLoading);
            setIsChecked(true);
        }, 1000);
    };

    return (
        <div
            className="recaptcha"
        >
            <div
                className="agreement"
            >
                <div
                    className={`customCheckbox ${isLoading ? 'hidden' : ''}`}
                    onClick={onClick}
                >
                </div>
                <div className={`lds-ring ${!isLoading ? 'hidden' : 'visible'}`}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <Image src={Checked} className={`${!isChecked ? 'hidden' : ''}`}/>
                <label>I&apos;m not a robot</label>
            </div>
            <div
                className="privacy"
            >
                <Image src={Privacy} width="44" height="55"/>
            </div>
        </div>
    )
}