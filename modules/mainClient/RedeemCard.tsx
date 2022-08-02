import {Award} from '../../common/models/award';
import BasicCard from '../../common/Layout/BasicCard';
import BenefitIcon from '../benefit/BenefitIcon';
import Button from '../../common/UI/Button';
import { ConfiguredAward } from '../../common/models/configuredAward';
import ImageComp from '../../common/UI/ImageComp';
import classes from './RedeemCard.module.css';

export interface RedeemCardProps{
    configuredAward:ConfiguredAward;
    colors:{primary_color:string, secondary_color:string};
    enableRedeem:boolean;

}

const RedeemCard = (props:RedeemCardProps) =>{
    const award = props.configuredAward.award;
    return(
       <BasicCard>
        <div className={classes.container}>
            <div className={classes.imageContainer}>
                    {award.imageType === 'icon' && <BenefitIcon icon={String(award.icon)} />}
                    {award.imageType === 'image' && 
                        <div className={classes.imageContainer}>
                                        <ImageComp image={award.image} image_alt={award.description} />
                        </div>}
            </div>
            <div className={classes.textContainer}>
                <div className={classes.titleContainer}>
                    <h5>{award.title}</h5>
                </div>
                <div className={classes.requiredPoints}>
                    <h4 style={{color:props.colors.secondary_color}}>{props.configuredAward.requiredPoints}</h4>
                    <p style={{color:props.colors.secondary_color}}>puntos</p>
                </div>
                
            </div>
            
        </div>
        <div className={classes.redeemButtonContainer}>
                <Button 
                    isAvailable={props.enableRedeem}
                    label="Redimir" 
                    additionalStyle={{backgroundColor:props.colors.primary_color, 
                    color:"var(--loyalty-on-primary-text-color)", width:"100%", height:"49px"}}/>
        </div>
       </BasicCard>
    )
}

export default RedeemCard;