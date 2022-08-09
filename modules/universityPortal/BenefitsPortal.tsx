import { Award } from '../../common/models/award';
import BasicCard from '../../common/Layout/BasicCard';
import BenefitIcon from '../benefit/BenefitIcon';
import ImageComp from '../../common/UI/ImageComp';
import classes from './BenefitsPortal.module.css';

export interface BenefitsPortalProps{
    awardList:Array<Award>;
    secondaryColor:string;
}
const BenefitsPortal = (props:BenefitsPortalProps) =>{
    return(
        <section id="benefitPortalId" className={classes.container}>
            {/* <h4 className={classes.title}>Qué beneficios tenés ?</h4> */}
            {props.awardList.map(
                (benefit, index) =>{
                    return (
                        <BasicCard key={index} additionalStyle={{border:`1px solid ${props.secondaryColor}`, maxWidth:"320px" }}>
                            <div className={classes.cardContainer}>
                                <div className={classes.imageContainer}>
                                    {benefit.imageType === 'icon' && <BenefitIcon icon={String(benefit.icon)} />}
                                    {benefit.imageType === 'image' && 
                                    <div className={classes.imageContainer}>
                                        <ImageComp image={benefit.image} image_alt={benefit.description} />
                                    </div>}
                                </div>
                                <div className={classes.textContainer}>
                                    <h4>{benefit.title}</h4>
                                </div>

                            </div>
                        </BasicCard>
                    )
                }
            )}
        </section>
    )
}

export default BenefitsPortal;