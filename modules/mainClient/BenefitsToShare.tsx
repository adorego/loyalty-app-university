import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';

import BenefitToShareCard from './BenefitToShareCard';
import { ConfiguredBenefit } from '../../common/models/configuredBenefit';
import classes from './BenefitsToShare.module.css';
import { colors_app } from '../../common/models/colors';
import { shareBenefitsActions } from '../../store/share-slice';
import { useRouter } from 'next/router';

export interface BenefitsToShareProps{
    benefitsToShare:Array<ConfiguredBenefit>;
    colors:colors_app
}
const BenefitsToShare = (props:BenefitsToShareProps) =>{

    const dispatch = useAppDispatch();
    const router = useRouter();
    const sigla = useAppSelector(state => state.auth.university.sigla);
    const onClickShareBenefitHandler = (benefit_id:string) =>{
        const benefitToShare = props.benefitsToShare.filter((item) => item.benefit._id === benefit_id );
        dispatch(shareBenefitsActions.setShareBenefit({configuredBenefit:benefitToShare[0]}));
        router.push(`/${sigla}/share`);
    }
    return(
        <div className={classes.container}>
            <h5 className={classes.shareTitle}>Compartí estos beneficios UCOM con tus amigos y ganá puntos</h5>
            <div className={classes.benefitsToShareListContainer}>
                    {props.benefitsToShare.map(
                        (configuredBenefit) =>{
                            return(
                                <BenefitToShareCard 
                                key={configuredBenefit.benefit._id} 
                                benefit_id={configuredBenefit.benefit._id}
                                benefitDescription={configuredBenefit.benefit.description}
                                benefitImage={configuredBenefit.benefit.image}
                                granting_events={configuredBenefit.granting} 
                                onClickShareHandler={onClickShareBenefitHandler}
                                colors={props.colors}/>
                                
                            )
                        }
                    )}
            </div>
        </div>
    )
}

export default BenefitsToShare;