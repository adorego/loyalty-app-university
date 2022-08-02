import ImageModel from "./ImageModel";

export interface Award{
    _id:string;
    imageType:string;
    image:ImageModel | null;
    icon:string | null;
    title:string;
    description:string;
}