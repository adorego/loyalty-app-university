import { useEffect, useState } from 'react';

import Button from '../../common/UI/Button';
import Image from 'next/image';
import ImageModel from '../../common/models/ImageModel';
import Link from 'next/link';
import classes from './UniversityPortal.module.css';
import { url } from 'inspector';
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
        <section className={classes.container}>
            {props.topLinks && <ul>
                {props.topLinks.map(
                    (title, index) =>{
                        const hrefLink = '#'+ `section${index+1}` ;
                        
                        return(
                            
                            <li key={index}><h5 className={classes.topLinks}><a href={hrefLink}>{title}</a></h5></li>
                        )
                    }
                )}
            </ul>}
            <h2 className={classes.title}>{props.title}</h2>
            <div className={classes.headline} style = {props.backgroundImage ? {backgroundImage:`url(${props.backgroundImage.src})`} : {}}>
                    <h4 className={classes.forText}>{props.forText}</h4>
                    <Button label={props.buttonText} 
                            onClickHandler={onRegisterButtonClick}
                            isAvailable={true}
                            additionalStyle={{backgroundColor:props.primaryColor, color:"white", padding:"16px 16px"}} />
                </div>
            
            
        </section>
    )
}

export default UniversityPortal;