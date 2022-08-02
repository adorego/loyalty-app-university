import {FaBars} from 'react-icons/fa';
import Image from 'next/image';
import ImageModel from '../models/ImageModel';
import classes from './Header.module.css';

export interface HeaderProps{
    backGroundColor:string;
    logo:ImageModel;
    allowDrawer:boolean;
    onDrawerToggle:() => void;
}
const Header = (props:HeaderProps) =>{
    const toggleSideBar = () =>{
        props.onDrawerToggle();
     }
    return(
        <nav className={classes.container} style={{backgroundColor:props.backGroundColor}}>
            <div className={classes.logo}>
                        <Image src={props.logo.src}
                        width={props.logo.width}
                        height={props.logo.height} 
                        alt='Logo' 
                        layout="responsive"
                        priority={true}
                         />
            </div>
            {props.allowDrawer && <div className={classes.hamburger}>
                <FaBars className={classes.bars} onClick={toggleSideBar} />
            </div>}
        </nav>
    )
}

export default Header;