import { FaMoneyBill, FaTag } from "react-icons/fa";

import classes from './BenefitIcon.module.css';
export interface BenefitIconProps{
    icon:string;
}

const BenefitIcon = (props:BenefitIconProps) =>{
    return(
        <>
            {props.icon === 'money' && <FaMoneyBill className={classes.icon} />}
            {props.icon === 'tag' && <FaTag className={classes.icon} />}
        </>
    )
}

export default BenefitIcon;