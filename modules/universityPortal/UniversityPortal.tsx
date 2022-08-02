import { useEffect, useState } from 'react';

import Button from '../../common/UI/Button';
import Image from 'next/image';
import ImageModel from '../../common/models/ImageModel';
import classes from './UniversityPortal.module.css';
import { useAppSelector } from '../../hooks/store-hooks';
import { useRouter } from 'next/router';

export interface UniversityPortalProps{
    topLinks:Array<string>;
    title:string;
    backgroundImage:ImageModel;
    backgroundImage_large:ImageModel;
    forText:string;
    buttonText:string;
    primaryColor:string;
}
const UniversityPortal = (props:UniversityPortalProps) =>{
    const router = useRouter();
    const sigla = useAppSelector((state) => state.auth.university.sigla);
    
    

    const onRegisterButtonClick = () =>{
        sigla ? router.push(`/${sigla}/auth/register`) : '';
    }
    
    return(
        <div className={classes.container}>
            {props.topLinks && <ul>
                {props.topLinks.map(
                    (title, index) =>{
                        return(
                            <li key={index}><h5 className={classes.topLinks}>{title}</h5></li>
                        )
                    }
                )}
            </ul>}
            <h3 className={classes.title}>{props.title}</h3>
            <div className={classes.headline}>
                {props.backgroundImage && <Image src={props.backgroundImage.src} 
                        width={props.backgroundImage.width}
                        height={props.backgroundImage.height}
                        alt='Background Image' 
                        layout="responsive"
                        priority={true}
                />}
                
                <div className={classes.insideContent}>
                    <h5 className={classes.forText}>{props.forText}</h5>
                    <div className={classes.registerButtonContainer}>
                        <Button label={props.buttonText} 
                        onClickHandler={onRegisterButtonClick}
                        isAvailable={true}
                        additionalStyle={{backgroundColor:props.primaryColor, color:"white", padding:"16px 16px"}} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UniversityPortal;