import CachedUniversityLayout from "../../../common/Layout/CacheUniversityLayout";
import PageWithLayoutType from "../../../types/PageWithLayout";
import { ReactNode } from "react";
import RegisterComp from "../../../modules/auth/RegisterComp";
import { useAppSelector } from "../../../hooks/store-hooks";

export interface RegisterProps{
    children:ReactNode;
}
const Register = (props:RegisterProps) =>{
    const colors = useAppSelector(state => state.ui.color)
    
    return(
         <RegisterComp primary_color={colors.primary} />
       
    )
}

(Register as PageWithLayoutType).layout = CachedUniversityLayout
export default Register;