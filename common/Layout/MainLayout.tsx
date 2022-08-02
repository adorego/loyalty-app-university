import HomeHeader from './HomeHeader';
import { ReactNode } from 'react';

export interface MainLayoutProps{
    children:ReactNode;
}
const MainLayout = ({children,...props}:MainLayoutProps) =>{
    
        return(
            <>
            <header>
                <HomeHeader />
            </header>
            <main>
                {children}
            </main>
            
            </>
        )
    
    
}

export default MainLayout;