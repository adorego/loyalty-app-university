import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useEffect, useState } from "react";

import BasicCard from "../Layout/BasicCard";
import Button from "./Button";
import Image from 'next/image';
import ImageModel from "../models/ImageModel";
import classes from './CarrucelCard.module.css';

interface Content{
    img:{src:string,width:string,height:string,alt:string},
    title:string;
    text:string;
    link?:string;
}
export interface CarrucelCardProps{
    content:Array<Content>;
    secondaryLightColor:string;
}
const CarrucelCard = (props:CarrucelCardProps) =>{
    const [contentIndex, setContentIndex] = useState<number>(0);

    useEffect(
        () =>{
            const animateCarrucel = () =>{
                    setContentIndex(state => {
                        if(state === props.content.length - 1){
                            return 0
                        }else{
                            return state + 1;
                        }
                    
                    });
            }
            
            if(props.content.length > 1){
                const id = setInterval(animateCarrucel, 5000);
                return function clean(){
                    clearInterval(id);
                }
            }
        },[]
    )

    
    return(
        
        <BasicCard>
            
                <div className={classes.imageContainer}>
                    <Image className={classes.mainImage} src={props.content[contentIndex].img.src} alt={props.content[contentIndex].img.alt} 
                    width={props.content[contentIndex].img.width} 
                    height={props.content[contentIndex].img.height} 
                    layout={'responsive'} />
                    {/* <FaAngleLeft className={classes.leftArrow} onClick={nextContent} />
                    <FaAngleRight className={classes.rightArrow} onClick={nextContent}/> */}
                </div>
                <div className={classes.textContainer}>
                    <h4 className={classes.textTitle}>{props.content[contentIndex].title}</h4>
                    <p className={classes.textContent}>{props.content[contentIndex].text}</p>
                </div>
                {props.content[contentIndex].link !== undefined && 
                <a className={classes.knowMoreLink} href={props.content[contentIndex].link}>Saber mas</a>}
                
                
            
        </BasicCard>
        
    )
}

export default CarrucelCard;