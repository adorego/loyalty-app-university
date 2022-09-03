import BasicCard from "../../common/Layout/BasicCard";
import BenefitPortalModel from "../../common/models/benefitPortalModel";
import Button from "../../common/UI/Button";
import CarrucelCard from "../../common/UI/CarrucelCard";
import classes from "./BenefitPortal.module.css";
export interface SectionContent{
    img:{src:string, width:string, height:string, alt:string},
    title:string;
    text:string;
}

export interface LandingSection{
    _id:string;
    title:string;
    content:Array<SectionContent>;

}
export interface BenefitPortalProps{
    mainData:BenefitPortalModel;
    secondaryLightColor:string;
    landingSections?:Array<LandingSection>;

}
const BenefitPortal = (props:BenefitPortalProps) =>{
    console.log("props:", props.landingSections);
    return(
        <div className={classes.container}>
            <section id="#topBenefit">
                <BasicCard >
                    <h3 className={classes.title}>{props.mainData.title}</h3>
                    <h5 className={classes.description} style={{color:props.secondaryLightColor}}>{props.mainData.description}</h5>
                    <h5 className={classes.code}>{props.mainData.benefitCode}</h5>
                    <h5 className={classes.validity}>{props.mainData.validity}</h5>
                    <Button label="Contactarme" isAvailable={true} 
                                
                                additionalStyle={{backgroundColor:props.secondaryLightColor,
                                color:"var(--loyalty-on-primary-text-color)", width:"100%",
                                margin:"16px 0px 32px 0px"}}
                                />
                </BasicCard>
            </section>
            {props.landingSections?.map(
                    (landingSection, index) =>{
                        // console.log("landingSection:", landingSection);
                        const sectionContent = landingSection.content;
                        const sectionId = `${landingSection.title}`.trim().toLowerCase();
                        return(
                            <section className={classes.section} key={index} id={sectionId}>
                            <h3 className={classes.sectionTitle}>{landingSection.title}</h3>
                            <CarrucelCard content={sectionContent} secondaryLightColor={props.secondaryLightColor} />
                            </section>
                        )
                    }
            )}
            {/* <section id="#diplomadosId">
                
                <h3 className={classes.sectionTitle}>Diplomados UCOM</h3> 
                <CarrucelCard content={[{img:{src:'/images/ucom/diplomado_fintech.png', width:"704", height:"508", alt:"Diplomado en Fintech"},
                                        title:"Diplomado en Fintech", text:"El Diplomado en Fintech es la fusión entre las áreas de tecnología y las finanzas"},
                                        {img:{src:'/images/ucom/diplomado_inteligencia_de_negocios.png', width:"704", height:"508", alt:"Diplomado en Inteligencia de Negocios"},
                                        title:"Diplomado en Inteligencia de Negocios", text:"El Diplomado en Inteligencia de Negocios fusiona las áreas de negocios con BigData"},
                                        {img:{src:'/images/ucom/diplomado_machine_learning.png', width:"704", height:"508", alt:"Diplomado en Machine Learning"},
                                        title:"Diplomado en Machine Learning", text:"El Diplomado en Machine Learning te prepara el el fantástico mundo del análisis de Datos"}]}   
                              secondaryLightColor="#8E9600"  />          
            </section>
            <section id="#docentesId">
                    <h3 className={classes.sectionTitle}>Docentes</h3>
                    <CarrucelCard content={[{img:{src:'/images/ucom/docente1.jpeg', width:"247", height:"247", alt:"Margarita Ruiz Olazar, D.Sc."},
                                        title:"Margarita Ruiz Olazar, D.Sc.", text:"Coordinadora de la carrera de Informática y Profesora de la UCOM. Doctora en Ciencias por la Universidad Federal de Río de Janeiro, Brasil. Postgraduada del Instituto de Matemática y Estadística (IME) por la Universidad de São Paulo, Brasil. Coordinadora del Diplomado en Análisis de Big Data y de cursos de la Facultad de Informática de la UCOM. Sus líneas de investigación abarcan el modelamiento de datos y procesos, minería de datos, gerenciamiento de bases de datos, bioinformática, neuroinformática, aplicaciones en ciencia de datos y tecnología de la información."},
                                        {img:{src:'/images/ucom/docente2.jpeg', width:"247", height:"247", alt:"Carlos Filippi"},
                                        title:"Carlos Filippi", text:"Ingeniero Electromecánico por la Universidad Nacional de Asunción (UNA), con estudios de Maestría en Educación por la Università Ca' Foscari de Venecia y la Universidad Católica Nuestra Señora de la Asunción. Actualmente se encuentra elaborando su tesis del Doctorado en Educación con énfasis en la Gestión de la Educación Superior de la Universidad Nacional de Asunción."},
                                        {img:{src:'/images/ucom/docente3.jpeg', width:"247", height:"247", alt:"Lic. Juan Pablo Bazán"},
                                        title:"Lic. Juan Pablo Bazán", text:"Licenciado en Análisis de Sistemas por la Universidad Católica (2015), apasionado por el análisis de datos y la tecnología. Con experiencia de más de 10 años analizando datos y su correspondiente visualización."}]}   
                              secondaryLightColor="#8E9600"  />   
                
            </section> */}
        </div>
    )
}

export default BenefitPortal;