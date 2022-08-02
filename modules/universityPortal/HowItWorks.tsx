import { FaGifts, FaShareAlt, FaUserPlus, FaUsers } from 'react-icons/fa';

import BasicCard from '../../common/Layout/BasicCard';
import Button from '../../common/UI/Button';
import classes from './HowItWorks.module.css';

export interface HowItWorksProps{

    primaryColor:string;
}

const HowItWorks = (props:HowItWorksProps) =>{
    return(
        <section id='howItWorksId' className={classes.container}>
            <h4 className={classes.title}>Cómo funciona ?</h4>
            <BasicCard>
                <div className={classes.cardContainer}>
                    <div className={classes.firstRowCard}>
                        <FaUserPlus className={classes.iconStep} />
                        <div className={classes.stepTextContainer}>
                            <h5 className={classes.stepText}>Paso 1</h5>
                        </div>
                    </div>
                    <h3 className={classes.cardTagline}>Registrate</h3>
                    <div className={classes.registerButtonContainer}>
                        <Button label={'Registrate hoy'} 
                            isAvailable={true}
                            additionalStyle={{backgroundColor:props.primaryColor, color:"white", padding:"16px 16px"}} />
                    </div>
                </div>
            </BasicCard>
            <BasicCard>
                <div className={classes.cardContainer}>
                    <div className={classes.firstRowCard}>
                        <FaUsers className={classes.iconStep}/>
                        <div className={classes.stepTextContainer}>
                            <h5 className={classes.stepText}>Paso 2</h5>
                        </div>
                    </div>
                    <h4 className={classes.cardTagline}>Comparti Beneficios UCOM con tus amigos</h4>
                </div>
            </BasicCard>
            <BasicCard>
                <div className={classes.cardContainer}>
                    <div className={classes.firstRowCard}>
                        <FaGifts className={classes.iconStep}/>
                        <div className={classes.stepTextContainer}>
                            <h5 className={classes.stepText}>Paso 3</h5>
                        </div>
                    </div>
                    <h4 className={classes.cardTagline}>Con nuevos matriculados ganás premios en efectivo</h4>
                </div>
            </BasicCard>
        </section>
    )
}

export default HowItWorks;