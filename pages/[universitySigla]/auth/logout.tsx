import {signOut, useSession} from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';

import CachedUniversityLayout from '../../../common/Layout/CacheUniversityLayout';
import PageWithLayoutType from '../../../types/PageWithLayout';
import { uiActions } from '../../../store/ui-slice';
import { useEffect } from 'react';
import {useRouter} from 'next/router';

export interface LogoutProps{

}
const Logout = (pros:LogoutProps) =>{
    const {data:session,status} = useSession();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const sigla = useAppSelector(state => state.auth.university.sigla);

    dispatch(uiActions.setLoading({loading:true}));
    
    useEffect(
        () =>{
            if(status === 'authenticated'){
                // router.push(`/${sigla}/`);
                // signOut();
                console.log('sigla:', sigla);
                
            }
            return(
                () =>{
                    dispatch(uiActions.setLoading({loading:false}));
                }
            )
        },[]
    )
    
    
    

    
    return(
        <p>...Logout</p>
    )
    
}
(Logout as PageWithLayoutType).layout = CachedUniversityLayout
export default Logout;