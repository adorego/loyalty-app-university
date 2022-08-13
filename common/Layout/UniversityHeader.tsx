import Image from 'next/image';
import ImageModel from '../models/ImageModel';
import Link from 'next/link';
import { authActions } from '../../store/auth-slice';
import classes from './UniversityHeader.module.css';
import { signOut } from 'next-auth/react';
import { uiActions } from '../../store/ui-slice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {useSession} from 'next-auth/react';

export interface UniversityHeaderProps{
    backGroundColor:string;
    loginLinkColor:string;
    logo:ImageModel;
    
}
const UniversityHeader = (props:UniversityHeaderProps) =>{
    const router = useRouter();
    const {data:session, status} = useSession();
    const dispatch = useDispatch();
    const {universitySigla:sigla} = router.query;
    const containerStyle = props.backGroundColor !== "" ? {backgroundColor:props.backGroundColor} : {};
    const linkStyle = props.loginLinkColor !== "" ? {color:props.loginLinkColor} : {};
    
    const signOutHandler = async () =>{
        // dispatch(uiActions.setLoading({loading:true}));
        dispatch(authActions.setLogout({logOut:true}));
        const result = await router.push(`/${sigla}/`);
        signOut();
        dispatch(uiActions.setLoading({loading:false}));
        
    }

    const backToHome = () =>{
        dispatch(uiActions.setLoading({loading:true}));
        router.push(`/${sigla}`);
    }
    return(
            <div className={classes.container}
                        style={containerStyle}>
                <div className={classes.logo}>
                    {props.logo && props.logo.src &&  
                    <Image 
                        onClick={backToHome}     
                        src={props.logo.src}
                        width={props.logo.width}
                        height={props.logo.height} 
                        alt='Logo' 
                        layout="responsive"
                        priority={true}/>
                    }
                </div>
                <div className={classes.logginLink}>
                    {status === 'unauthenticated' && 
                        <Link href={`/${sigla}/auth/login`}>
                            <a className={classes.SignInOutLink} style={linkStyle}>Ingresar</a>
                        </Link>}
                    {status === 'authenticated' && 
                        <button onClick={signOutHandler} className={classes.SignOutLink} 
                            style={linkStyle}>
                            Salir
                        </button>
                    }
                        
                </div>
            </div>
    )
    
}

export default UniversityHeader;