import React, {Component, Fragment, ReactNode, useEffect, useState} from "react";

import Button from "../../common/UI/Button";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import classes from "./HomeHeader.module.css";
import logo from '../../public/images/loyalty_logo.png';
import {useRouter} from 'next/router';

const HomeHeader = () =>{
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    
    useEffect(
        ()=>{
            function handleWindowResize() {
                if(getWindowWidth() >= 600){
                    setShowMenu(true);
                }else{
                    setShowMenu(false);
                }
              }
          
              window.addEventListener('resize', handleWindowResize);
          
              return () => {
                window.removeEventListener('resize', handleWindowResize);
              };
        },[]
    )

    const onLogoClickHandler = () =>{
        router.push('/');
    }
    const onMenuBarClickHandler = () =>{
        setShowMenu(!showMenu);
    }

    const getWindowWidth = () =>{
        return window.innerWidth;
    }
    
    return(
        <Fragment>
                <nav className={classes.container}>
                    <div className={classes.logo}>
                        <Image src={logo} 
                        alt='Logo of LoyaltyAPP' 
                        layout="responsive"
                        priority={true}
                        onClick={onLogoClickHandler}
                         />
                    </div>
                    {showMenu && <div className={classes.links}>
                        <ul>
                            <li><Link href={'/#como_funciona'}><a onClick={onMenuBarClickHandler}>Cómo funciona ?</a></Link></li>
                            <li><Link href={'/#cuanto_cuesta'} ><a onClick={onMenuBarClickHandler}>Cúanto cuesta ?</a></Link></li>
                            <li><Link href={'/#contacto'} ><a onClick={onMenuBarClickHandler}>Contacto</a></Link></li>
                        </ul>
                    </div>}
                    <FaBars className={classes.menuBar} onClick={onMenuBarClickHandler} />
                    {/* <Link href='/login'>
                        <a style={{color:"var(--loyalty-secondary-color)"}}>Ingresar</a>
                    </Link> */}
                            
                    
                </nav>
                
            </Fragment>
    )
}


export default HomeHeader;