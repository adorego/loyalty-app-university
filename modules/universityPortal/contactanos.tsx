import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';

import BasicCard from '../../common/Layout/BasicCard';
import classes from './Contactanos.module.css';

export interface ContactanosProps{
    email:string;
    phone:string;
    whatsapp:string;
    secondaryColor:string;
    
}
const Contactanos = (props:ContactanosProps) =>{
    return(
        <section id="contactanosId" className={classes.container}>
            <BasicCard additionalStyle={{border:`1px solid ${props.secondaryColor}`, maxWidth:"320px" }}>
                <div className={classes.cardContainer}>
                    <FaEnvelope className={classes.iconClass} />
                    <h5>{props.email}</h5>
                </div>
            </BasicCard>
            <BasicCard additionalStyle={{border:`1px solid ${props.secondaryColor}`, maxWidth:"320px" }}>
                <div className={classes.cardContainer}>
                    <FaPhone className={classes.iconClass}/>
                    <h5>{props.phone}</h5>
                </div>
            </BasicCard>
            <BasicCard additionalStyle={{border:`1px solid ${props.secondaryColor}`, maxWidth:"320px" }}>
                <div className={classes.cardContainer}>
                    <FaWhatsapp className={classes.iconClass}/>
                    <h5>{props.phone}</h5>
                </div>
            </BasicCard>

        </section>
    )
}

export default Contactanos;