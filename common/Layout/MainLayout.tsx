import Head from 'next/head';
import HomeHeader from './HomeHeader';
import { ReactNode } from 'react';

export interface MainLayoutProps{
    children:ReactNode;
}
const MainLayout = ({children,...props}:MainLayoutProps) =>{
    
        return(
            <>
            <Head>
                <title>LoyaltyAPP Universidad, APP de matriculación digital, Innovación en la Educación</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <meta property="og:url" content={'https://www.loyaltyapp.com.py'} key="ogurl" />
                <meta property="og:image" content={'https://loyaltyapp.com.py/images/social_image.png'} key="ogimage" />
                <meta property="og:site_name" content={"LoyaltyApp"} key="ogsitename" />
                <meta property="og:title" content={"LoyaltyAPP Universidad, APP de matriculación digital, Innovación en la Educación"} key="ogtitle" />
                <meta property="og:description" content={"LoyaltyAPP es una plataforma de creación de APPs de Ventas Digitales y Fidelización"} key="ogdesc" />
            </Head>
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