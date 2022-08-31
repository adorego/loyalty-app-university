import '../styles/globals.css'

import {SessionProvider as NextAuthProvider} from 'next-auth/react';
import PageWithLayoutType from '../types/PageWithLayout';
import { ReactNode } from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import store from '../store/index';

type AppLayoutProps = {
  Component: PageWithLayoutType
  pageProps:any

};

const MyApp = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const Layout = Component.layout || ((children:ReactNode) => <>{children}</>);
  
  console.log("pageProps:", {...pageProps});
  return(
    <NextAuthProvider session={pageProps.session}>
      <ReduxProvider store={store}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout> 
      </ReduxProvider>
    </NextAuthProvider>
  )
  
        
        
  
};



export default MyApp
