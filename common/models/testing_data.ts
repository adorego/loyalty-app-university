import { FaMoneyBill, FaTag } from 'react-icons/fa';

import { Award } from './award';
import { createElement } from 'react';

//FaMoneyBill
//FaTag

export const benefitsList:Array<Award> = [
    {
        _id:"26767689",
        image:null,
        imageType:"icon",
        icon:"money",
        title:"Dinero en Efectivo",
        description:"Premios en efectivo desde 500.000 Gs"
    },
    {
        _id:"26767690",
        imageType:"image",
        image:{src:"/images/ucom/mochila.jpeg", width:"1000", height:"1000"},
        icon:null,
        title:"Mochila deportiva",
        description:"Hermosa mochila de la marca Chenson, resistente y hermosa"
    },
    {
        _id:"26767691",
        imageType:"icon",
        image:null,
        icon: "tag",
        title:"Descuentos en cuotas",
        description:"Descuentos hasta el 100% en tus cursos, especializaciones o maestrias UCOM"
    }
]