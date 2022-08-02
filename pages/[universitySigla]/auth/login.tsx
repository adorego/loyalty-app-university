import CachedUniversityLayout from "../../../common/Layout/CacheUniversityLayout";
import LoginComp from "../../../modules/auth/LoginComp";
import PageWithLayoutType from "../../../types/PageWithLayout";
import { ReactNode } from "react";

export interface LoginProps{
    children:ReactNode;
}
const Login = (props:LoginProps) =>{
    return(
        <LoginComp />
    )
}

(Login as PageWithLayoutType).layout = CachedUniversityLayout
export default Login;