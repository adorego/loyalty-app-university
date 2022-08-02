import '../styles/globals.css'

import { ReactNode, useEffect, useState } from 'react';
import store, { AppDispatch } from '../store/index';
import { useAppDispatch, useAppSelector } from '../hooks/store-hooks';

import {SessionProvider as NextAuthProvider} from 'next-auth/react';
import PageWithLayoutType from '../types/PageWithLayout';
import {Provider as ReduxProvider} from 'react-redux';
import Router from 'next/router';
import classSpinner from '../styles/spinner.module.css';
import { uiActions } from '../store/ui-slice';

type AppLayoutProps = {
  Component: PageWithLayoutType
  pageProps:any

};

const MyApp = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const Layout = Component.layout || ((children:ReactNode) => <>{children}</>);
  
  
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
