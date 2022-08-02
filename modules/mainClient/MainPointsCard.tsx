import BasicCard from "../../common/Layout/BasicCard"
import { MainCompProps } from "./MainComp";
import classes from './MainPointsCard.module.css';

export interface MainPointsCardProps{
    header:string;
    points:string;
    footer:string;
    secondary_color:string;
}

const MainPointsCard = (props:MainPointsCardProps) =>{
    return(
        <BasicCard additionalStyle={{border:`2px solid ${props.secondary_color}`}}>
            <div className={classes.container} >
                <h3 className={classes.header}>{props.header}</h3>
                <h2 className={classes.points} style={{color:props.secondary_color}}>{props.points}</h2>
                <h6 className={classes.footer} style={{color:props.secondary_color}}>{props.footer}</h6>
            </div>
        </BasicCard>
    )
}

export default MainPointsCard;