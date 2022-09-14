import classes from "./Button.module.css";
import {memo} from 'react';

export interface ButtonInterface{
    isAvailable:boolean;
    label:string;
    onClickHandler?:any;
    additionalStyle?:{};
    children?: React.ReactNode;
}
const Button =({isAvailable, ...props}:ButtonInterface) => {
    

   
    if(isAvailable){
        return (
            <button onClick={props.onClickHandler} className={`${classes["button-per"]} button-app`} style={props.additionalStyle ? props.additionalStyle : ""}    >
                {props.label}{props.children}
            </button>
        )
        
    }else{
        return(
            <button onClick={props.onClickHandler} className={`${classes["button-per"]} button-app`} style={props.additionalStyle ? props.additionalStyle : ""} disabled >
                {props.label}{props.children}
            </button>
        )
    }
    
}


export default Button;