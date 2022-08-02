import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";

import Button from "../../common/UI/Button";
import Input from "../../common/UI/Input";
import { authActions } from "../../store/auth-slice";
import classes from './VerificationCode.module.css';
import { useRef } from "react";
import { useRouter } from "next/router";

const VerificationCode = () =>{
    const verification_code = useAppSelector(state => (state.auth.user.verification_code));
    const sigla = useAppSelector(state => state.auth.university.sigla);
    const colors = useAppSelector(state => state.ui.color);
    const dispatch = useAppDispatch();
    const inputValue = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const onValidate = (event:React.ChangeEvent<HTMLButtonElement>) =>{
        if(inputValue && inputValue.current){
             const currentValue = inputValue.current.value;
             if(currentValue === verification_code){
                dispatch(authActions.validate_email({verified:true}));
                router.push(`/${sigla}/auth/login`);
            }
        }
       
    }
    return(
        <div className={classes.box}>

            <p>Por favor ingresá el código que te hemos enviado por correo</p>
            <Input label="" ref={inputValue} required={false}  />
            <Button onClickHandler={onValidate}  
            isAvailable={true} 
            label="Confirmar" 
            additionalStyle={{color:"var(--loyalty-on-primary-text-color)", 
            backgroundColor:colors.primary,
            margin:"16px 0px 0px 0px", width:"320px"}}/>
        </div>
    )
}

export default VerificationCode;