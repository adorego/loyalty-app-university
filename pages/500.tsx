import CachedUniversityLayout from '../common/Layout/CacheUniversityLayout';
import Link from 'next/link';
import PageWithLayoutType from '../types/PageWithLayout';

export interface Page500Props{

}
const Page500 = (props:Page500Props) =>{
  return(
     <div style={{textAlign:"center"}}>
      <Link href="/">
        <a>
          Volver
        </a>
      </Link>
      <h3>`500 - Hubo un error interno en el servidor`</h3>
      
    </div>
    )
}

(Page500 as PageWithLayoutType).layout = CachedUniversityLayout

export default Page500;