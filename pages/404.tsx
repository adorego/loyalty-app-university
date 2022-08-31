import CachedUniversityLayout from '../common/Layout/CacheUniversityLayout';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import PageWithLayoutType from '../types/PageWithLayout';
import { ReactNode } from 'react';
import UniversityPortalHeadingInfo from '../common/models/universityPortalHeadingInfo';
import { connect } from '../common/DataBase/Connect';

export interface Page404Props{
  children:ReactNode;
  headInfo:UniversityPortalHeadingInfo;
}

const Page404 = ({children,...props}:Page404Props) =>{
  return(
     <div style={{textAlign:"center"}}>
      <Link href="/">
        <a>
          Volver
        </a>
      </Link>
      <h3>{"404 - Pagina no encontrada"}</h3>
    </div>
    )
}

(Page404 as PageWithLayoutType).layout = CachedUniversityLayout

export default Page404;

