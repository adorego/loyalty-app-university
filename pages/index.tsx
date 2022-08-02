import Button from '../common/UI/Button';
import Image from 'next/image';
import MainLayout from '../common/Layout/MainLayout';
import {NextPage} from 'next';
import PageWithLayoutType from '../types/PageWithLayout';
import { ReactNode } from 'react';
import background from '../public/images/backGround.png';
import classes from '../styles/Home.module.css';
import {useRouter} from "next/router";

export interface HomePageProps{

}
const HomePage = (props:HomePageProps) =>{
    const router = useRouter();
    const onRegistrarmeClickHandler = () =>{
        router.push('/register');
    }
    return(
        <main className={classes.container}>
            <section id='landingId' className={classes.landingContainer}>
                <Image className={classes.backGroundImage} 
                src={background} 
                alt="Background"
                priority={true} 
                layout='responsive' />
                <div id="landingLegend" className={classes.landingLegend}>
                    <h2>Qué es LoyaltyAPP ?</h2>
                    
                    <p className={'body1'}>Imaginate poder crear tu propia APP de Marketing Digital en línea en simples pasos, personalizada
                        a la marca de tu Universidad.
                    </p>
                    <p className={'body1'}>
                        Esta APP permite a tus principales Testimonios (tus alumnos) compartir beneficios únicos con su entorno y poder ganar a la vez
                        con las nuevas matriculaciones que cada uno genere.
                    </p>
                    <p className={'body1'}>
                        Si ya lo estas vizualizando, hacé click en Registrarme y comenzá a hacerlo realidad.
                    </p>
                    <p className={'body1'}>
                        Lo mejor de todo es que LoyaltyAPP solo te cobra por resultados reales, ya no más cobros por vistas, 
                        por interacción, solamente matriculaciones.
                    </p>
                    <div className={classes.registerButtonContainer}>
                        <Button label={"Registrarme"} isAvailable={true} 
                        onClickHandler={onRegistrarmeClickHandler}
                        additionalStyle={{backgroundColor:"var(--loyalty-primary-color)", 
                                        color:"var(--loyalty-on-primary-text-color)",
                                        padding:"0px 30px 0px 30px"}}/>
                    </div>
                    
                </div>
               
            </section>
        </main>
    )
}

(HomePage as PageWithLayoutType).layout = MainLayout
// HomePage.getLayout = function getLayout(page:ReactNode) {
//     return(
//         <MainLayout>
//             {page}
//         </MainLayout>
//     )
// }
export default HomePage;
