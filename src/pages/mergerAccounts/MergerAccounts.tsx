import React from 'react';
import {AuthPage} from "@/src/components/ui/auth-page/AuthPage";
import MergerImage from "@/src/assets/images/merger-image";

export const MergerAccounts = () => {
    return <AuthPage title="Merger of Accounts"
                     text="The user with email Epam@epam.com is already in the system. Could we merge this accounts?"
                     nameButton="Yes, merge"
                     nameButtonTwo='No'
                     variant='merger'
    >{<MergerImage/>}</AuthPage>
};

