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
                                        title:"Diplomado en Fintech", text:"El Diplomado en Fintech es la fusi??n entre las ??reas de tecnolog??a y las finanzas"},
                                        {img:{src:'/images/ucom/diplomado_inteligencia_de_negocios.png', width:"704", height:"508", alt:"Diplomado en Inteligencia de Negocios"},
                                        title:"Diplomado en Inteligencia de Negocios", text:"El Diplomado en Inteligencia de Negocios fusiona las ??reas de negocios con BigData"},
                                        {img:{src:'/images/ucom/diplomado_machine_learning.png', width:"704", height:"508", alt:"Diplomado en Machine Learning"},
                                        title:"Diplomado en Machine Learning", text:"El Diplomado en Machine Learning te prepara el el fant??stico mundo del an??lisis de Datos"}]}   
                              secondaryLightColor="#8E9600"  />          
            </section>
            <section id="#docentesId">
                    <h3 className={classes.sectionTitle}>Docentes</h3>
                    <CarrucelCard content={[{img:{src:'/images/ucom/docente1.jpeg', width:"247", height:"247", alt:"Margarita Ruiz Olazar, D.Sc."},
                                        title:"Margarita Ruiz Olazar, D.Sc.", text:"Coordinadora de la carrera de Inform??tica y Profesora de la UCOM. Doctora en Ciencias por la Universidad Federal de R??o de Janeiro, Brasil. Postgraduada del Instituto de Matem??tica y Estad??stica (IME) por la Universidad de S??o Paulo, Brasil. Coordinadora del Diplomado en An??lisis de Big Data y de cursos de la Facultad de Inform??tica de la UCOM. Sus l??neas de investigaci??n abarcan el modelamiento de datos y procesos, miner??a de datos, gerenciamiento de bases de datos, bioinform??tica, neuroinform??tica, aplicaciones en ciencia de datos y tecnolog??a de la informaci??n."},
                                        {img:{src:'/images/ucom/docente2.jpeg', width:"247", height:"247", alt:"Carlos Filippi"},
                                        title:"Carlos Filippi", text:"Ingeniero Electromec??nico por la Universidad Nacional de Asunci??n (UNA), con estudios de Maestr??a en Educaci??n por la Universit?? Ca' Foscari de Venecia y la Universidad Cat??lica Nuestra Se??ora de la Asunci??n. Actualmente se encuentra elaborando su tesis del Doctorado en Educaci??n con ??nfasis en la Gesti??n de la Educaci??n Superior de la Universidad Nacional de Asunci??n."},
                                        {img:{src:'/images/ucom/docente3.jpeg', width:"247", height:"247", alt:"Lic. Juan Pablo Baz??n"},
                                        title:"Lic. Juan Pablo Baz??n", text:"Licenciado en An??lisis de Sistemas por la Universidad Cat??lica (2015), apasionado por el an??lisis de datos y la tecnolog??a. Con experiencia de m??s de 10 a??os analizando datos y su correspondiente visualizaci??n."}]}   
                              secondaryLightColor="#8E9600"  />   
                
            </section> */}
        </div>
    )
}

export default BenefitPortal;