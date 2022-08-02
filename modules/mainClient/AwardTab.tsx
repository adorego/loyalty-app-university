import { ConfiguredAward } from '../../common/models/configuredAward';
import MainPointsCard from './MainPointsCard';
import RedeemCard from './RedeemCard';
import classes from './AwardsTab.module.css';

export interface AwardsTabProps{
    points:string;
    primary_color:string;
    secondary_color:string;
    configuredAwards:Array<ConfiguredAward>
}
const AwardsTab = (props:AwardsTabProps) =>{

    const isRedeemAvailable = (ownedPoints:string, requiredPoints:string) =>{
        if(Number(ownedPoints)  >= Number(requiredPoints)){
            return true;
        }
        return false;
    }
    return(
        <div className={classes.container}>
            <MainPointsCard header={"Tenés"} 
            points={props.points} footer={"puntos"} 
            secondary_color={props.secondary_color} />
            <div className={classes.redeemListContainer}>
                {props.configuredAwards.map(
                    (configuredAward) =>{
                        return(
                            <RedeemCard key={configuredAward.award._id} 
                            configuredAward={configuredAward}  
                            colors={{primary_color:props.primary_color, secondary_color:props.secondary_color}}
                            enableRedeem={isRedeemAvailable(props.points, configuredAward.requiredPoints)}
                            />
                        )
                    }
                )}
            </div>
        </div>
    )
}

export default AwardsTab;