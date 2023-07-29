import React, {useState} from 'react';
import './recaptcha.scss';
import Image from 'next/image';
import Privacy from '../../../assets/icons/recaptcha.svg';
import Checked from '../../../assets/icons/recaptchaChecked.svg';

interface FormProps {
    primary?: boolean
    expired?: boolean
}

export const Recaptcha = ({
                              primary,
                              expired
                          }: FormProps) => {

    const mode = `storybook-recaptcha--${primary ? 'primary' : !expired ? 'error' : 'expired'}`;

    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const onClick = () => {
        setIsLoading(!isLoading);

        setTimeout(() => {
            setIsLoading(!isLoading);
            setIsChecked(!isChecked);
        }, 2000);
    };

    console.log(mode)

    return (
        <div
            className={mode}
        >
            <div
                className='recaptcha'
            >
                <div
                    className='agreement'
                >
                    <div
                        className={`expiredMessage ${!expired ? 'hidden' : ''}`}
                    >
                        Verification expired. Check the checkbox again.
                    </div>
                    <div
                        className={`customCheckbox ${isLoading ? 'hidden' : ''}`}
                        onClick={onClick}
                    >
                    </div>
                    <div
                        className={`lds-ring ${!isLoading || isChecked ? 'hidden' : ''}`}
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <Image
                        src={Checked}
                        className={`checked ${!isChecked ? 'hidden' : ''}`}
                        alt='checked'
                    />
                    <label>I&apos;m not a robot</label>
                </div>
                <div
                    className='privacy'
                >
                    <Image
                        src={Privacy}
                        width='44'
                        height='55'
                        alt='privacy'
                    />
                </div>
            </div>
            <p
                className={`error-text`}
            >
                Please verify that you are not a robot
            </p>
        </div>
    )
}