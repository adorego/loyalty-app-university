import {forwardRef, memo} from 'react';

import classes from './Input.module.css';

const defaultValues = {
    label:"",
    withIcon:false,
    required:false
    
}

export interface InputProps{
    id?:string;
    label:string;
    value?:any;
    required:boolean;
    onChangeHandler?:(event:React.ChangeEvent<HTMLInputElement>)=> void;
    onBlurHandler?:(event:React.FocusEvent<HTMLInputElement>) => void;
    onFocusHandler?:(event:React.FocusEvent<HTMLInputElement>) => void;
    onInputChangeHandler?:(event:React.ChangeEvent<HTMLInputElement>) => void;
    isInputInvalid?:boolean;
    errorMessage?:string;
    defaultValue?:string;
    additionalAttributes?:{};
    helpMessage?:string;
}
const Input = forwardRef<HTMLInputElement, InputProps>((props = defaultValues, ref) => {
    
    const inputClass = `${classes.inputClass} body1 ${props.isInputInvalid ? classes.invalid : ''}`;
    
    return(
        
            <div className={classes.formControl}>
                <label className={props.required ? classes.requiredLabel : classes.label} htmlFor={props.id}>{props.label}</label>
                {props.helpMessage && <p className={`${classes.helpMessage} caption`}>{props.helpMessage}</p>}
                <input className={inputClass} 
                    id={props.id} 
                    ref={ref}
                    onChange={props.onChangeHandler} 
                    onInput={props.onInputChangeHandler}
                    onBlur={props.onBlurHandler} 
                    onFocus={props.onFocusHandler}
                    value={props.value}
                    
                    {...props.additionalAttributes} >
                </input>
                {props.isInputInvalid && <p className={classes.errorMessage}>{props.errorMessage}</p>}
            </div>
                    
                   
                    
                
                
                
            
    
    )
});

Input.displayName = 'Input'

export default memo(Input);