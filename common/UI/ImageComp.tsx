import Image from "next/image";
import ImageModel from "../models/ImageModel";

export interface ImageCompProps{
    image:ImageModel | null;
    image_alt:string;
}

const ImageComp = (props:ImageCompProps) =>{
    return(
        <>
            {props.image && 
            <Image 
            src={props.image.src}
            layout="responsive" 
            alt={props.image_alt}
            width={props.image?.width} 
            height={props.image?.height} />}
        </>
    )
}

export default ImageComp;