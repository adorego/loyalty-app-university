import { FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import {NextPage} from 'next';
import { ReactNode } from 'react';
import background from '../../public/images/backGround.png';
import classes from './HomePageComp.module.css';
import screenShot from '../../public/images/ScreenStanford.png';
import screenShot2 from '../../public/images/ScreenStanford2.png';
import {useRouter} from "next/router";

const HomePageComp = () =>{
    const loaderProp =({ src }:any) => {
        return src;
    }
    return(
        
        <>
            <section id='landingId' className={classes.landingContainer}>
                <div className={classes.imageContainer}>
                    <Image className={classes.backGroundImage} 
                    src={background} 
                    alt="Background"
                    loader={loaderProp}
                    priority={true} 
                    unoptimized={true}
                    layout="responsive" />
                </div>
                {/* <div className={classes.searchText}>
                    <p className={classes.seartTextParragraph}>Si ya tienes configurada tu Universidad en el servicio LoyaltyAPP, ingresa las siglas para ir a la APP</p>
                    <Input label='Ingresa la sigla de tu Universidad' required={true} 
                    additionalAttributes={{margin:"200px 0px 20px 0px"}} />
                    <Button label='Buscar' isAvailable={true} additionalStyle={{width:"100%", 
                    backgroundColor:"var(--loyalty-secondary-color)", margin:"auto"}} />
                </div> */}
                <div className={classes.sectionTitle}>
                        <h2>Qué es LoyaltyAPP ?</h2>
                </div>
                <div className={classes.landingContentContainer}>
                    <div id="landingLegend" className={classes.landingLegend}>
                        
                        
                        <h6>Imaginate poder crear tu propia APP de Marketing Digital personalizada
                            a la marca de tu Universidad.
                        </h6>
                        <h6>
                            Esta APP permite a tus principales Testimonios (tus alumnos) compartir beneficios únicos con su entorno y poder ganar a la vez
                            con las nuevas matriculaciones que cada uno genere.
                        </h6>
                        <h6>
                            Si ya lo estás vizualizando, contactanos hoy a: <FaWhatsapp />: <a target={"_blank"} rel={"noreferrer"} href='https://wa.me/+595974265005?text=Quiero saber más sobre LoyaltyAPP'>(+595) 974 265 005</a>  y comenzá a hacerlo realidad.
                        </h6>
                        <h6>
                            Lo mejor de todo es que LoyaltyAPP sólo te cobra por resultados reales, ya no más cobros por vistas, 
                            por interacción, solamente por matriculaciones.
                        </h6>
                        
                        
                    </div>
                    <div className={classes.screenAppContainer}>
                        <div className={classes.screenContainer}>
                            <Image className={classes.screenImage} 
                            src={screenShot} 
                            alt="Screen Shot APP"
                            priority={true} 
                            layout="responsive" />
                            
                        </div>
                        <div className={classes.screenContainer2}>
                            <Image className={classes.screenImage2} 
                                src={screenShot2} 
                                alt="Screen Shot APP"
                                priority={true} 
                                layout="responsive" />

                        </div>
                    </div>
                </div>
               
            </section>
            <section id="como_funciona">
                <div className={classes.sectionTitle}>
                    <h2>Cómo funciona ?</h2>
                </div>
                <div className={classes.howItWorks}>
                    
                    <h5>Paso 1:</h5>
                    <h6>Contactanos al <FaWhatsapp />: <a target={"_blank"} rel={"noreferrer"} href='https://wa.me/+595974265005?text=Quiero saber más sobre LoyaltyAPP'>(+595) 974 265 005.</a></h6>
                    <h5>Paso 2:</h5>
                    <h6>Creamos tu cuenta LoyaltyAPP Universidad personalizada a tu marca.</h6>
                    <h5>Paso 3:</h5>
                    <h6>Te ayudamos a crear tus Campañas de Marketing Digital Uno a Uno.</h6>
                    <h5>Paso 4:</h5>
                    <h6>Probás la solución en un entorno controlado.</h6>
                    <h5>Paso 5:</h5>
                    <h6>Una vez aprobados todos los detalles, lanzás tu APP en tu Universidad.</h6>
                    


                </div>
            </section>
            <section id="cuanto_cuesta">
                <div className={classes.sectionTitle}>
                    <h2>Cuánto cuesta ?</h2>
                </div>
                <div className={classes.cuantoCuesta}>
                   
                    <h4>Etapa de personalización</h4>
                    <h6>La solución LoyaltyAPP tiene un costo mínimo de personalización dependiendo de las funcionalidades que desees agregar</h6>
                    <h4>Etapa operativa</h4>
                    <h6>Una vez operativo sólo tiene un costo por resultados reales</h6>
                </div>
            </section>
            <section id="contacto">
            <div className={classes.contacto}>
                <h2>Contacto</h2>
                <h6>Contactanos al:     <span><FaWhatsapp /></span> <a target={"_blank"} rel={"noreferrer"} href='https://wa.me/+595974265005?text=Quiero saber más sobre LoyaltyAPP'>(+595) 974 265 005</a></h6>
            </div>
            </section>
        </>
        
    )
}

export default HomePageComp;