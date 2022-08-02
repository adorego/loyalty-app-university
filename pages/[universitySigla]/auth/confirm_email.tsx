import CachedUniversityLayout from "../../../common/Layout/CacheUniversityLayout";
import PageWithLayoutType from "../../../types/PageWithLayout";
import { ReactNode } from "react";
import VerificationCode from "../../../modules/auth/VerificationCode";

export interface EmailConfirmationProps{
    children:ReactNode;
}

const EmailConfirmation = (props:EmailConfirmationProps) =>{
    return(
        <VerificationCode />
        
    )
}

(EmailConfirmation as PageWithLayoutType).layout = CachedUniversityLayout
export default EmailConfirmation;
