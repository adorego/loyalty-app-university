import CachedUniversityLayout from '../common/Layout/CacheUniversityLayout';
import Link from 'next/link';
import PageWithLayoutType from '../types/PageWithLayout';

export interface Page404Props{

}

const Page404 = (props:Page404Props) =>{
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