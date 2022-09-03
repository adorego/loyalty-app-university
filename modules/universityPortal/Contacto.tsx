import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';

import BasicCard from '../../common/Layout/BasicCard';
import classes from './Contacto.module.css';

export interface ContactoProps{
    email:string;
    phone:string;
    whatsapp:string;
    secondaryColor:string;
    primaryColor:string;
    
}
const Contacto = (props:ContactoProps) =>{
    return(
        <section id="section3" className={classes.container} style={{backgroundColor:props.primaryColor}}>
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

export default Contacto;